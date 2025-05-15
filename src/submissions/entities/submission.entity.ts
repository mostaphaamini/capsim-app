import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
export class Submission {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  score: number; // final score percentage

  @Column()
  totalPoints: number;

  @Column()
  maxPoints: number;

  @CreateDateColumn()
  createdAt: Date;
}
