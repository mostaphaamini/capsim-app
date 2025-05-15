export class CreateSubmissionDto {
    answers: {
      questionId: number;
      selectedAnswerIds: number[];
    }[];
  }
  