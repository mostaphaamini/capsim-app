import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Submission } from './entities/submission.entity';
import { CreateSubmissionDto } from './dto/create-submission.dto';
import { Question } from '../questions/entities/question.entity';
import { Answer } from '../questions/entities/answer.entity';

@Injectable()
export class SubmissionsService {
  constructor(
    @InjectRepository(Submission)
    private readonly submissionRepo: Repository<Submission>,

    @InjectRepository(Question)
    private readonly questionRepo: Repository<Question>,

    @InjectRepository(Answer)
    private readonly answerRepo: Repository<Answer>,
  ) {}

  async create(dto: CreateSubmissionDto): Promise<Submission> {
    const allQuestions = await this.questionRepo.find();
    const allAnswers = await this.answerRepo.find();

    let totalPoints = 0;
    let maxPoints = 0;

    for (const q of allQuestions) {
      const submission = dto.answers.find(a => a.questionId === q.id);
      if (!submission) continue;

      const correctAnswers = q.answers;
      const maxForQuestion = correctAnswers.reduce((sum, a) => sum + a.points, 0);
      maxPoints += maxForQuestion;

      const selectedAnswers = allAnswers.filter(a => submission.selectedAnswerIds.includes(a.id));

      if (q.type === 'single') {
        const selected = selectedAnswers[0];
        if (selected) totalPoints += selected.points;
      } else {
        totalPoints += selectedAnswers.reduce((sum, a) => sum + a.points, 0);
      }
    }

    const scorePercent = Math.round((totalPoints / maxPoints) * 100);

    const submissionEntity = this.submissionRepo.create({
      score: scorePercent,
      totalPoints,
      maxPoints,
    });

    return await this.submissionRepo.save(submissionEntity);
  }

  async getReport(): Promise<{ range: string; count: number }[]> {
    const submissions = await this.submissionRepo.find();

    const buckets: { [range: string]: number } = {};
    for (let i = 0; i <= 100; i += 10) {
      buckets[`${i}-${i + 9}%`] = 0;
    }

    for (const sub of submissions) {
      const bucket = `${Math.floor(sub.score / 10) * 10}-${Math.floor(sub.score / 10) * 10 + 9}%`;
      buckets[bucket]++;
    }

    return Object.entries(buckets).map(([range, count]) => ({ range, count }));
  }
}
