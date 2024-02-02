import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { QuestionComment } from '@/domain/forum/enterprise/entities/question-comment'

import { Comment as PrismaComment, Prisma } from '@prisma/client'

export class PrismaQuestionCommentMapper {
  static toDomain(rawQuestionComment: PrismaComment): QuestionComment {
    if (!rawQuestionComment.questionId) {
      throw new Error('Invalid comment type.')
    }

    return QuestionComment.create(
      {
        content: rawQuestionComment.content,
        authorId: new UniqueEntityID(rawQuestionComment.authorId),
        questionId: new UniqueEntityID(rawQuestionComment.questionId),
        createdAt: rawQuestionComment.createdAt,
        updatedAt: rawQuestionComment.updatedAt,
      },
      new UniqueEntityID(rawQuestionComment.id),
    )
  }

  static toPrisma(
    questionComment: QuestionComment,
  ): Prisma.CommentUncheckedCreateInput {
    return {
      id: questionComment.id.toString(),
      authorId: questionComment.authorId.toString(),
      questionId: questionComment.questionId.toString(),
      content: questionComment.content,
      createdAt: questionComment.createdAt,
      updatedAt: questionComment.updatedAt,
    }
  }
}
