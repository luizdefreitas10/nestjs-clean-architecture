import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Question } from '@/domain/forum/enterprise/entities/question'
import { Slug } from '@/domain/forum/enterprise/entities/value-objects/slug'
import { Question as PrismaQuestion, Prisma } from '@prisma/client'

export class PrismaQuestionMapper {
  static toDomain(rawQuestion: PrismaQuestion): Question {
    return Question.create(
      {
        title: rawQuestion.title,
        content: rawQuestion.content,
        authorId: new UniqueEntityID(rawQuestion.authorId),
        bestAnswerId: rawQuestion.bestAnswerId
          ? new UniqueEntityID(rawQuestion.bestAnswerId)
          : null,
        slug: Slug.create(rawQuestion.slug),
        createdAt: rawQuestion.createdAt,
        updatedAt: rawQuestion.updatedAt,
      },
      new UniqueEntityID(rawQuestion.id),
    )
  }

  static toPrisma(question: Question): Prisma.QuestionUncheckedCreateInput {
    return {
      id: question.id.toString(),
      authorId: question.authorId.toString(),
      bestAnswerId: question.bestAnswerId?.toString(),
      title: question.title,
      content: question.content,
      slug: question.slug.value,
      createdAt: question.createdAt,
      updatedAt: question.updatedAt,
    }
  }
}
