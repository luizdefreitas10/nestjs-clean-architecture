import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Answer } from '@/domain/forum/enterprise/entities/answer'
import { Answer as PrismaAnswer, Prisma } from '@prisma/client'

export class PrismaAnswerMapper {
  static toDomain(rawAnswer: PrismaAnswer): Answer {
    return Answer.create(
      {
        content: rawAnswer.content,
        questionId: new UniqueEntityID(rawAnswer.questionId),
        authorId: new UniqueEntityID(rawAnswer.authorId),
        createdAt: rawAnswer.createdAt,
        updatedAt: rawAnswer.updatedAt,
      },
      new UniqueEntityID(rawAnswer.id),
    )
  }

  static toPrisma(answer: Answer): Prisma.AnswerUncheckedCreateInput {
    return {
      id: answer.id.toString(),
      authorId: answer.authorId.toString(),
      questionId: answer.questionId.toString(),
      content: answer.content,
      createdAt: answer.createdAt,
      updatedAt: answer.updatedAt,
    }
  }
}
