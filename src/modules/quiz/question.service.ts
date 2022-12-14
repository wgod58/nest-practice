import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { CreateQuestionDTO } from './dto/createQuestion.dto';
import { Question } from '../../database/question.entity';
import { QuizService } from './quiz.service';

@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(Question)
    private questionRepository: Repository<Question>,
    private quizService: QuizService,
    private dataSource: DataSource,
  ) {}

  getAllQuestion(): Promise<Question[]> {
    return this.questionRepository.find();
  }

  async createNewQuestion(question: CreateQuestionDTO): Promise<Question> {
    const queryRunner = this.dataSource.createQueryRunner();
    let result;

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const quiz = await this.quizService.findOneQuiz(question.quizId);
      const newQuestion = await this.questionRepository.create({
        question: question.question,
      });

      // throw new Error('test');
      newQuestion.quiz = quiz;

      await queryRunner.manager.save(newQuestion);
      // await newQuestion.save();
      await queryRunner.commitTransaction();

      result = newQuestion;
    } catch (error) {
      console.log(error);

      await queryRunner.rollbackTransaction();
      throw new Error(error);
    } finally {
      await queryRunner.release();
    }

    return result;
  }
}
