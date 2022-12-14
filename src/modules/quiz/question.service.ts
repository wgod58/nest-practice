import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { CreateQuestionDTO } from './dto/createQuestion.dto';
import { Question } from '../../database/question.entity';
// import { QuizService } from './quiz.service';
import { Quiz } from 'src/database/quiz.entity';

@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(Question)
    private questionRepository: Repository<Question>,
    // private quizService: QuizService,
    private dataSource: DataSource,
  ) {}

  getAllQuestion(): Promise<Question[]> {
    return this.questionRepository.find();
  }

  async createNewQuestion(question: CreateQuestionDTO): Promise<Question> {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    let result;

    try {
      const quiz = await queryRunner.manager.findOne(Quiz, {
        where: { id: question.quizId },
      });

      const newQuestion = await queryRunner.manager.create(Question, {
        question: question.question,
      });

      // const quiz = await this.quizService.findOneQuiz(question.quizId);
      // const newQuestion = await this.questionRepository.create({
      //   question: question.question,
      // });
      // throw new Error('test');
      newQuestion.quiz = quiz;
      await newQuestion.save();
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
