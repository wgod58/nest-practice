import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateQuizDTO } from '../dto/createQuiz.dto';
import { Quiz } from '../../../database/quiz.entity';
// import { Question } from '../../database/question.entity';

@Injectable()
export class QuizService {
  constructor(
    @InjectRepository(Quiz) private quizRepository: Repository<Quiz>,
  ) {}

  findAllQuiz(): Promise<Quiz[]> {
    return this.quizRepository.find({ relations: ['questions'] });
  }

  findOneQuiz(id: number): Promise<Quiz> {
    return this.quizRepository.findOne({
      where: { id },
      relations: ['questions'],
    });
  }

  async createNewQuiz(quiz: CreateQuizDTO): Promise<Quiz> {
    const result = await this.quizRepository.save(quiz);
    // await result.save();
    return result;
  }
}
