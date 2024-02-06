import {
  BadRequestException,
  Controller,
  HttpCode,
  Param,
  Patch,
  Put,
} from '@nestjs/common'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { UserPayload } from '@/infra/auth/jwt.strategy'
import { ChooseQuestionBestAnswerUseCase } from '@/domain/forum/application/use-cases/choose-question-best-answer'

@Controller('/answers/:answerId/choose-as-best')
// @UseGuards(JwtAuthGuard)
export class ChooseQuestionBestAnswerController {
  constructor(
    private chooseQuestionBestAnswer: ChooseQuestionBestAnswerUseCase,
  ) {}

  @Patch()
  @HttpCode(204)
  async handle(
    @CurrentUser() user: UserPayload,
    @Param('answerId') answerId: string,
  ) {
    const authorId = user.sub

    const result = await this.chooseQuestionBestAnswer.execute({
      answerId,
      authorId,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }
  }
}
