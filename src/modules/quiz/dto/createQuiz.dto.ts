import { IsNotEmpty, Length } from 'class-validator';

export class CreateQuizDTO {
  @IsNotEmpty({ message: 'quiz not empty' })
  @Length(3)
  title: string;

  @IsNotEmpty()
  @Length(3)
  description: string;
}
