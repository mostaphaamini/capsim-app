import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionsModule } from '../questions/questions.module';
import { SubmissionsModule } from './submissions.module';
import { Question } from '../questions/entities/question.entity';
import { Answer } from '../questions/entities/answer.entity';
import { Submission } from './entities/submission.entity';
import { QuestionsService } from '../questions/questions.service';

describe('SubmissionsController (e2e)', () => {
  let app: INestApplication;
  let questionService: QuestionsService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          entities: [Question, Answer, Submission],
          synchronize: true,
        }),
        QuestionsModule,
        SubmissionsModule,
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    questionService = moduleFixture.get(QuestionsService);
    await questionService.seed();
  });

  it('should calculate a submission score', async () => {
    const res = await request(app.getHttpServer())
      .post('/submissions')
      .send({
        answers: [
          { questionId: 1, selectedAnswerIds: [1] },      // Read a book (5)
          { questionId: 2, selectedAnswerIds: [8] },      // January 1985 (1)
          { questionId: 3, selectedAnswerIds: [9, 10, 12] } // ModXM (1), CapsimOutbox (0), CompXM (1)
        ],
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.score).toBe(47);
    expect(res.body.totalPoints).toBe(9);
    expect(res.body.maxPoints).toBe(19);
  });

  afterAll(async () => {
    await app.close();
  });
});
