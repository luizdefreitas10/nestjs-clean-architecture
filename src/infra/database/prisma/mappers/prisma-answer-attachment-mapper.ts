import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { AnswerAttachment } from '@/domain/forum/enterprise/entities/answer-attachment'

import { Attachment as PrismaAttachment, Prisma } from '@prisma/client'

export class PrismaAnswerAttachmentMapper {
  static toDomain(rawAnswerAttachment: PrismaAttachment): AnswerAttachment {
    if (!rawAnswerAttachment.answerId) {
      throw new Error('Invalid attachment type.')
    }

    return AnswerAttachment.create(
      {
        attachmentId: new UniqueEntityID(rawAnswerAttachment.id),
        answerId: new UniqueEntityID(rawAnswerAttachment.answerId),
      },
      new UniqueEntityID(rawAnswerAttachment.id),
    )
  }

  static toPrismaUpdateMany(
    attachments: AnswerAttachment[],
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
        answerId: attachments[0].answerId.toString(),
      },
    }
  }
}
