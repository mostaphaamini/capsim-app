import { Test, TestingModule } from '@nestjs/testing';
import { QuestionsService } from './questions.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Question } from './entities/question.entity';
import { Answer } from './entities/answer.entity';
import { QuestionsModule } from './questions.module';
import { INestApplication } from '@nestjs/common';

describe('QuestionsService', () => {
  let service: QuestionsService;
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          entities: [Question, Answer],
          synchronize: true,
        }),
        QuestionsModule,
      ],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();

    service = moduleRef.get<QuestionsService>(QuestionsService);
    await service.seed();
  });

  it('should return all seeded questions', async () => {
    const questions = await service.findAll();
    expect(questions.length).toBeGreaterThan(0);
    expect(questions[0]).toHaveProperty('answers');
  });

  afterAll(async () => {
    await app.close();
  });
});
