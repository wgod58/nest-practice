import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuizController } from './controller/quiz.controller';
import { QuestionController } from './controller/question.controller';
import { QuizService } from './service/quiz.service';
import { QuestionService } from './service/question.service';
import { Quiz } from 'src/database/quiz.entity';
import { Question } from 'src/database/question.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Quiz, Question])],
  controllers: [QuizController, QuestionController],
  providers: [QuizService, QuestionService],
})
export class QuizModule {}
