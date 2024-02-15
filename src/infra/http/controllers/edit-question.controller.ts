import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Param,
  Put,
} from '@nestjs/common'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { UserPayload } from '@/infra/auth/jwt.strategy'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import { z } from 'zod'
import { EditQuestionUseCase } from '@/domain/forum/application/use-cases/edit-question'

const editQuestionBodySchema = z.object({
  title: z.string(),
  content: z.string(),
  attachments: z.array(z.string().uuid()),
})

const vodyValidationPipe = new ZodValidationPipe(editQuestionBodySchema)

export type EditQuestionBodySchema = z.infer<typeof editQuestionBodySchema>

@Controller('/questions/:id')
// @UseGuards(JwtAuthGuard)
export class EditQuestionController {
  constructor(private editQuestion: EditQuestionUseCase) {}

  @Put()
  @HttpCode(204)
  async handle(
    @CurrentUser() user: UserPayload,
    @Body(vodyValidationPipe)
    body: EditQuestionBodySchema,
    @Param('id') questionId: string,
  ) {
    const { content, title, attachments } = body
    const authorId = user.sub

    const result = await this.editQuestion.execute({
      title,
      content,
      authorId,
      attachmentsIds: attachments,
      questionId,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }
  }
}
