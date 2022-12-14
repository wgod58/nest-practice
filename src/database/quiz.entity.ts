import {
  Table,
  Column,
  Model,
  PrimaryKey,
  AutoIncrement,
  Default,
} from 'sequelize-typescript';
import { Question } from './question.entity';

@Table
export class Quiz extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column
  title: string;

  @Column
  description: string;

  @Default(() => 1)
  @Column
  active: boolean;

  // @HasMany(() => Question, {
  //   // sourceKey: 'id',
  //   foreignKey: 'quizId',
  //   // as: 'questions',
  // })
  // questions: Question[];
}
