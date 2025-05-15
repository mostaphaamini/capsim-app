import { Controller, Post, Body, Get } from '@nestjs/common';
import { SubmissionsService } from './submissions.service';
import { CreateSubmissionDto } from './dto/create-submission.dto';
import { Submission } from './entities/submission.entity';

@Controller('submissions')
export class SubmissionsController {
  constructor(private readonly submissionsService: SubmissionsService) {}

  @Post()
  async submit(@Body() dto: CreateSubmissionDto): Promise<Submission> {
    return this.submissionsService.create(dto);
  }

  @Get('/report')
  async report() {
    return this.submissionsService.getReport();
  }
}
