import { Quiz } from '../../database/quiz.entity';
import { Question } from '../../database/question.entity';

export const quizProviders = [
  {
    provide: 'QUIZ_REPOSITORY',
    useValue: Quiz,
  },
  {
    provide: 'QUESTION_REPOSITORY',
    useValue: Question,
  },
];
