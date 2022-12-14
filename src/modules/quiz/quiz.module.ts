import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuizController } from './quiz.controller';
import { QuestionController } from './question.controller';
import { QuizService } from './quiz.service';
import { QuestionService } from './question.service';
import { Quiz } from 'src/database/quiz.entity';
import { Question } from 'src/database/question.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Quiz, Question])],
  controllers: [QuizController, QuestionController],
  providers: [
    QuizService,
    QuestionService,
    // { provide: 'SEQUELIZE', useValue: databaseProviders[0].useFactory() },
  ],
})
export class QuizModule {}
