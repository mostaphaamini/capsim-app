import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { Question } from './entities/question.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Controller('questions')
export class QuestionsController {
  constructor(
    @InjectRepository(Question)
    private readonly questionRepo: Repository<Question>,
    private readonly questionsService: QuestionsService
  ) {}

  @Get()
  async findAll(): Promise<any[]> {
    const questions = await this.questionsService.findAll();
    return questions.map((q) => ({
      ...q,
      answers: q.answers.map(({ id, text }) => ({ id, text })),
    }));
  }

  @Get(':id/answers') // just for testing
  async findAnswers(@Param('id') id: number) {
    const question = await this.questionRepo.findOne({
      where: { id },
      relations: ['answers'],
    });

    if (!question) {
      throw new NotFoundException('Question not found');
    }

    return {
      questionId: question.id,
      question: question.text,
      answers: question.answers,
    };
  }
}
