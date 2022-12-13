import {
  Body,
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateQuizDTO } from './dto/createQuiz.dto';
import { QuizService } from './quiz.service';

@Controller('quiz')
export class QuizController {
  constructor(private quizService: QuizService) {}

  @Get('/')
  getAllQuiz() {
    return this.quizService.getAllQuiz();
  }

  @Post('/')
  @UsePipes(ValidationPipe)
  createQuiz(@Body() quizData: CreateQuizDTO) {
    return { data: quizData };
  }
}
