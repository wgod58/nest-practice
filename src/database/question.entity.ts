import {
  Entity,
  Column,
  BaseEntity,
  PrimaryGeneratedColumn,
  ManyToOne,
} from 'typeorm';
import { Quiz } from './quiz.entity';

@Entity('question')
export class Question extends BaseEntity {
  @PrimaryGeneratedColumn({ comment: 'The quiz unique identifier' })
  id: number;

  @Column({ type: 'varchar' })
  question: string;

  @ManyToOne(() => Quiz, (quiz) => quiz.questions)
  quiz: Quiz;
}
