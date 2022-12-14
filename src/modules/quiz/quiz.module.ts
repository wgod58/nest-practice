import { Module } from '@nestjs/common';
import { QuizController } from './quiz.controller';
import { QuestionController } from './question.controller';
import { QuizService } from './quiz.service';
import { quizProviders } from './quiz.providers';
import { databaseProviders } from 'src/database/database.providers';
import { QuestionService } from './question.service';

@Module({
  controllers: [QuizController, QuestionController],
  providers: [
    QuizService,
    QuestionService,
    ...quizProviders,
    { provide: 'SEQUELIZE', useValue: databaseProviders[0].useFactory() },
  ],
})
export class QuizModule {}
