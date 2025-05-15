import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Answer } from './answer.entity';

export type QuestionType = 'single' | 'multiple';

@Entity()
export class Question {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  text: string;

  @Column({ type: 'varchar' }) // ✅ changed from enum to varchar
  type: QuestionType;
  
  @OneToMany(() => Answer, (answer) => answer.question, { cascade: true, eager: true })
  answers: Answer[];
}
