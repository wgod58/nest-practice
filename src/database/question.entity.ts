import {
  Table,
  Column,
  Model,
  PrimaryKey,
  AutoIncrement,
} from 'sequelize-typescript';
import { Quiz } from './quiz.entity';

@Table
export class Question extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column
  question: string;

  // @HasOne(() => Quiz, { foreignKey: 'id', sourceKey: 'quizId' })
  // quiz: Quiz;
}

// Question.belongsTo(Quiz);
