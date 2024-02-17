import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { CommentWithAuthor } from '@/domain/forum/enterprise/entities/value-objects/comment-with-author'
import { Comment as PrismaComment, User as PrismaUser } from '@prisma/client'

type PrismaCommentWithAuthor = PrismaComment & {
  author: PrismaUser
}

export class PrismaCommentWithAuthorMapper {
  static toDomain(rawCommentWithAuthor: PrismaCommentWithAuthor) {
    return CommentWithAuthor.create({
      commentId: new UniqueEntityID(rawCommentWithAuthor.id),
      authorId: new UniqueEntityID(rawCommentWithAuthor.authorId),
      author: rawCommentWithAuthor.author.name,
      content: rawCommentWithAuthor.content,
      createdAt: rawCommentWithAuthor.createdAt,
      updatedAt: rawCommentWithAuthor.updatedAt,
    })
  }
}
