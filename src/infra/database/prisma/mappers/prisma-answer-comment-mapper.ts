import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { AnswerComment } from '@/domain/forum/enterprise/entities/answer-comment'

import { Comment as PrismaComment, Prisma } from '@prisma/client'

export class PrismaAnswerCommentMapper {
  static toDomain(rawAnswerComment: PrismaComment): AnswerComment {
    if (!rawAnswerComment.answerId) {
      throw new Error('Invalid comment type.')
    }

    return AnswerComment.create(
      {
        content: rawAnswerComment.content,
        authorId: new UniqueEntityID(rawAnswerComment.authorId),
        answerId: new UniqueEntityID(rawAnswerComment.answerId),
        createdAt: rawAnswerComment.createdAt,
        updatedAt: rawAnswerComment.updatedAt,
      },
      new UniqueEntityID(rawAnswerComment.id),
    )
  }

  static toPrisma(
    answerComment: AnswerComment,
  ): Prisma.CommentUncheckedCreateInput {
    return {
      id: answerComment.id.toString(),
      authorId: answerComment.authorId.toString(),
      answerId: answerComment.answerId.toString(),
      content: answerComment.content,
      createdAt: answerComment.createdAt,
      updatedAt: answerComment.updatedAt,
    }
  }
}
