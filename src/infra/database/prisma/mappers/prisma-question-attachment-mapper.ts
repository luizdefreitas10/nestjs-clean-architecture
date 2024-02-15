import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Attachment } from '@/domain/forum/enterprise/entities/attachment'
import { QuestionAttachment } from '@/domain/forum/enterprise/entities/question-attachment'

import { Attachment as PrismaAttachment, Prisma } from '@prisma/client'

export class PrismaQuestionAttachmentMapper {
  static toDomain(rawQuestionAttachment: PrismaAttachment): QuestionAttachment {
    if (!rawQuestionAttachment.questionId) {
      throw new Error('Invalid attachment type.')
    }

    return QuestionAttachment.create(
      {
        attachmentId: new UniqueEntityID(rawQuestionAttachment.id),
        questionId: new UniqueEntityID(rawQuestionAttachment.questionId),
      },
      new UniqueEntityID(rawQuestionAttachment.id),
    )
  }

  static toPrisma(
    attachments: QuestionAttachment[],
  ): Prisma.AttachmentUpdateManyArgs {
    const attachmentIds = attachments.map((attachment) => {
      return attachment.attachmentId.toString()
    })

    return {
      where: {
        id: {
          in: attachmentIds,
        },
      },
      data: {
        questionId: attachments[0].questionId.toString(),
      },
    }
  }
}
