import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Quiz } from 'src/database/quiz.entity';
import { CreateQuizDTO } from './dto/createQuiz.dto';
import { QuizService } from './quiz.service';

@Controller('quiz')
export class QuizController {
  constructor(private quizService: QuizService) {}

  @Get('/')
  getAllQuiz(): Promise<Quiz[]> {
    return this.quizService.findAllQuiz();
  }

  @Get('/:id')
  getOneQuiz(@Param('id', ParseIntPipe) id: number): Promise<Quiz> {
    return this.quizService.findOneQuiz(id);
  }

  @Post('/')
  @HttpCode(200)
  @UsePipes(ValidationPipe)
  createQuiz(@Body() quizData: CreateQuizDTO) {
    return this.quizService.createNewQuiz(quizData);
  }
}
