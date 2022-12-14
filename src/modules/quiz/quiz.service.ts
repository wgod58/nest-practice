import { Inject, Injectable } from '@nestjs/common';
import { CreateQuizDTO } from './dto/createQuiz.dto';
import { Quiz } from '../../database/quiz.entity';
import { Question } from '../../database/question.entity';
import { Sequelize } from 'sequelize-typescript';
// import { Transaction } from 'sequelize';

@Injectable()
export class QuizService {
  constructor(
    @Inject('QUIZ_REPOSITORY') private quizRepository: typeof Quiz,
    @Inject('SEQUELIZE')
    private readonly sequelizeInstance: Sequelize,
  ) {}

  getAllQuiz() {
    return this.quizRepository.findAll({
      include: [
        {
          model: Question,
          // as: 'questions',
          required: false,
          // include: [{ model: Quiz, required: false }],
        },
      ],
    });
  }

  async createNewQuiz(quiz: CreateQuizDTO) {
    const transaction = await this.sequelizeInstance.transaction();
    const result = await this.quizRepository.create(
      { ...quiz },
      { transaction: transaction },
    );

    await transaction.commit();

    return result;
  }
}
