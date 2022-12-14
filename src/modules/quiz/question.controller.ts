import {
  Body,
  Controller,
  HttpCode,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateQuestionDTO } from './dto/createQuestion.dto';
import { QuestionService } from './question.service';

@Controller('question')
export class QuestionController {
  constructor(private questionService: QuestionService) {}

  @Post('/')
  @HttpCode(200)
  @UsePipes(ValidationPipe)
  createQuiz(@Body() questionData: CreateQuestionDTO) {
    return this.questionService.createNewQuestion(questionData);
  }
}
