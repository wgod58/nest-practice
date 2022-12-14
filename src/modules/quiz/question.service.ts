import { Inject, Injectable } from '@nestjs/common';
import { CreateQuestionDTO } from './dto/createQuestion.dto';
import { Question } from '../../database/question.entity';
import { Sequelize } from 'sequelize-typescript';
// import { Transaction } from 'sequelize';

@Injectable()
export class QuestionService {
  constructor(
    @Inject('QUESTION_REPOSITORY') private questionRepository: typeof Question,
    @Inject('SEQUELIZE')
    private readonly sequelizeInstance: Sequelize,
  ) {}

  getAllQuestion() {
    return this.questionRepository.findAll<Question>();
  }

  async createNewQuestion(question: CreateQuestionDTO) {
    const transaction = await this.sequelizeInstance.transaction();
    const result = await this.questionRepository.create(
      { ...question },
      { transaction: transaction },
    );

    await transaction.commit();

    return result;
  }
}
