import { IsString, IsIn, ValidateNested, ArrayMinSize } from 'class-validator';
import { Type } from 'class-transformer';
import { QuestionType, QuestionTypes } from './question-type.enum';

class CreateAnswerDto {
  @IsString()
  text: string;
}

export class CreateQuestionDto {
  @IsString()
  text: string;

  @IsIn(QuestionTypes)
  type: QuestionType;

  @ValidateNested({ each: true })
  @Type(() => CreateAnswerDto)
  @ArrayMinSize(1)
  answers: CreateAnswerDto[];
}
