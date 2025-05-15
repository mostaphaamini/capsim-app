import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { QuestionsModule } from './questions/questions.module';
import { SubmissionsModule } from './submissions/submissions.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Question } from './questions/entities/question.entity';
import { Answer } from './questions/entities/answer.entity';
import { Submission } from './submissions/entities/submission.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'capsim.db',
      synchronize: true,
      autoLoadEntities: true,
    }),
    QuestionsModule,
    SubmissionsModule,
  ],
})
export class AppModule {}
