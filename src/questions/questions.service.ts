import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, In, Repository } from 'typeorm';
import { Question, QuestionType } from './entities/question.entity';
import { Answer } from './entities/answer.entity';

@Injectable()
export class QuestionsService {
  constructor(
    @InjectRepository(Question)
    private readonly questionRepo: Repository<Question>,

    @InjectRepository(Answer)
    private readonly answerRepo: Repository<Answer>,

  ) {}

  async findAll(): Promise<any[]> {
    // 1. Get all IDs first
    const ids = await this.questionRepo.find({ select: ['id'] });
  
    if (ids.length <= 4) {
      // fallback: return all if <= 4 total
      return this.questionRepo.find({ relations: ['answers'] });
    }
  
    // 2. Randomly pick 4 distinct IDs
    const shuffled = ids.sort(() => Math.random() - 0.4);
    const pickedIds = shuffled.slice(0, 4).map((q) => q.id);
  
    // 3. Load questions with answers
    const questions = await this.questionRepo.find({
      where: { id: In(pickedIds) },
      relations: ['answers'],
    });
  
    // 4. Strip `points` if needed
    return questions.map((q) => ({
      id: q.id,
      text: q.text,
      type: q.type,
      answers: q.answers.map((a) => ({ id: a.id, text: a.text })),
    }));
  }
  

  async seed(): Promise<void> {
    const count = await this.questionRepo.count();
    if (count > 0) return;

    const questions: Array<{
      text: string;
      type: QuestionType;
      answers: Answer[];
    }> = [
      {
        text: "What's the first thing you should do when you need motivation?",
        type: 'single',
        answers: [
          this.answerRepo.create({ text: 'Read a book', points: 5 }),
          this.answerRepo.create({ text: 'Watch social media', points: 0 }),
          this.answerRepo.create({ text: 'Go to the gym', points: 3 }),
          this.answerRepo.create({ text: 'Run in the park', points: 7 }),
        ],
      },
      {
        text: 'When was Capsim Founded?',
        type: 'single',
        answers: [
          this.answerRepo.create({ text: 'August 2010', points: 0 }),
          this.answerRepo.create({ text: 'April 1990', points: 0 }),
          this.answerRepo.create({ text: 'December 2000', points: 0 }),
          this.answerRepo.create({ text: 'January 1985', points: 1 }),
        ],
      },
      {
        text: 'Which of the following are Capsim products?',
        type: 'multiple',
        answers: [
          this.answerRepo.create({ text: 'CapsimInbox', points: 1 }),
          this.answerRepo.create({ text: 'ModXM', points: 1 }),
          this.answerRepo.create({ text: 'CapsimOutbox', points: 0 }),
          this.answerRepo.create({ text: 'CompXM', points: 1 }),
        ],
      },
      {
        text: 'What motivates most people for long-term goals?',
        type: 'single',
        answers: [
          this.answerRepo.create({ text: 'External praise', points: 0 }),
          this.answerRepo.create({ text: 'Money alone', points: 0 }),
          this.answerRepo.create({ text: 'Internal purpose and meaning', points: 1 }),
          this.answerRepo.create({ text: 'Fear of failure', points: 0 }),
        ],
      },
      
      {
        text: 'What are key benefits of experiential learning?',
        type: 'multiple',
        answers: [
          this.answerRepo.create({ text: 'Safe failure environments', points: 1 }),
          this.answerRepo.create({ text: 'Hands-on decision making', points: 1 }),
          this.answerRepo.create({ text: 'Watching videos', points: 0 }),
          this.answerRepo.create({ text: 'Live lectures only', points: 0 }),
        ],
      },
      
      {
        text: 'Which Capsim tools support leadership skill assessment?',
        type: 'multiple',
        answers: [
          this.answerRepo.create({ text: 'CapsimInbox', points: 1 }),
          this.answerRepo.create({ text: 'ModXM', points: 1 }),
          this.answerRepo.create({ text: 'Slack', points: 0 }),
          this.answerRepo.create({ text: 'Excel', points: 0 }),
        ],
      },
      
      {
        text: 'Which activities are best for daily focus?',
        type: 'multiple',
        answers: [
          this.answerRepo.create({ text: 'Setting 3 main priorities', points: 1 }),
          this.answerRepo.create({ text: 'Checking email all day', points: 0 }),
          this.answerRepo.create({ text: 'Turning on Do Not Disturb', points: 1 }),
          this.answerRepo.create({ text: 'Reacting to every ping', points: 0 }),
        ],
      },
      
      {
        text: 'What is a correct use case for CapsimInbox?',
        type: 'single',
        answers: [
          this.answerRepo.create({ text: 'Measuring programming skill', points: 0 }),
          this.answerRepo.create({ text: 'Evaluating soft skills under time pressure', points: 1 }),
          this.answerRepo.create({ text: 'Creating financial forecasts', points: 0 }),
          this.answerRepo.create({ text: 'Sending marketing campaigns', points: 0 }),
        ],
      },
      
      {
        text: 'How does ModXM stand out from standard assessments?',
        type: 'single',
        answers: [
          this.answerRepo.create({ text: 'It’s a spreadsheet', points: 0 }),
          this.answerRepo.create({ text: 'It simulates branching scenarios', points: 1 }),
          this.answerRepo.create({ text: 'It is a live interview', points: 0 }),
          this.answerRepo.create({ text: 'It only grades writing skills', points: 0 }),
        ],
      },
      
      {
        text: 'Which of the following are signs of engaged learners?',
        type: 'multiple',
        answers: [
          this.answerRepo.create({ text: 'Asking questions', points: 1 }),
          this.answerRepo.create({ text: 'Ignoring feedback', points: 0 }),
          this.answerRepo.create({ text: 'Volunteering for team tasks', points: 1 }),
          this.answerRepo.create({ text: 'Complaining constantly', points: 0 }),
        ],
      },
      
      {
        text: 'What is the goal of a business simulation?',
        type: 'single',
        answers: [
          this.answerRepo.create({ text: 'Memorize facts', points: 0 }),
          this.answerRepo.create({ text: 'Apply knowledge to decisions', points: 1 }),
          this.answerRepo.create({ text: 'Create slides', points: 0 }),
          this.answerRepo.create({ text: 'Pass a quiz', points: 0 }),
        ],
      },
      
      {
        text: 'What improves simulation learning outcomes?',
        type: 'multiple',
        answers: [
          this.answerRepo.create({ text: 'Reflection after each round', points: 1 }),
          this.answerRepo.create({ text: 'Fast guessing', points: 0 }),
          this.answerRepo.create({ text: 'Peer discussion', points: 1 }),
          this.answerRepo.create({ text: 'Ignoring the feedback', points: 0 }),
        ],
      },
      
      {
        text: 'Which are common traits of strong self-learners?',
        type: 'multiple',
        answers: [
          this.answerRepo.create({ text: 'Curiosity', points: 1 }),
          this.answerRepo.create({ text: 'Fear of new things', points: 0 }),
          this.answerRepo.create({ text: 'Growth mindset', points: 1 }),
          this.answerRepo.create({ text: 'Avoiding responsibility', points: 0 }),
        ],
      },
      
      {
        text: 'What is the difference between CompXM and CapsimInbox?',
        type: 'single',
        answers: [
          this.answerRepo.create({ text: 'Inbox is simulation-only, CompXM includes exam', points: 1 }),
          this.answerRepo.create({ text: 'Inbox is for coding', points: 0 }),
          this.answerRepo.create({ text: 'CompXM is for writing essays', points: 0 }),
          this.answerRepo.create({ text: 'They are the same tool', points: 0 }),
        ],
      },
      
      {
        text: 'What is the best way to handle decision fatigue?',
        type: 'single',
        answers: [
          this.answerRepo.create({ text: 'Delay all decisions', points: 0 }),
          this.answerRepo.create({ text: 'Build habits to reduce daily choices', points: 1 }),
          this.answerRepo.create({ text: 'Switch tasks constantly', points: 0 }),
          this.answerRepo.create({ text: 'Answer emails first', points: 0 }),
        ],
      },
      
      {
        text: 'What can be simulated in Capsim tools?',
        type: 'multiple',
        answers: [
          this.answerRepo.create({ text: 'Management scenarios', points: 1 }),
          this.answerRepo.create({ text: 'Marketing campaigns', points: 1 }),
          this.answerRepo.create({ text: 'Live coding', points: 0 }),
          this.answerRepo.create({ text: 'Social networking', points: 0 }),
        ],
      },
      
      {
        text: 'Which of these does CapsimInbox measure well?',
        type: 'multiple',
        answers: [
          this.answerRepo.create({ text: 'Time management', points: 1 }),
          this.answerRepo.create({ text: 'Team collaboration', points: 1 }),
          this.answerRepo.create({ text: 'Spelling', points: 0 }),
          this.answerRepo.create({ text: 'Technical programming', points: 0 }),
        ],
      },
      
      {
        text: 'How should managers use feedback from simulations?',
        type: 'single',
        answers: [
          this.answerRepo.create({ text: 'Ignore it unless it’s perfect', points: 0 }),
          this.answerRepo.create({ text: 'Use it to coach employees', points: 1 }),
          this.answerRepo.create({ text: 'Share it publicly to shame', points: 0 }),
          this.answerRepo.create({ text: 'Save it for later without action', points: 0 }),
        ],
      },
      
      {
        text: 'What helps keep learners accountable in simulations?',
        type: 'multiple',
        answers: [
          this.answerRepo.create({ text: 'Progress tracking', points: 1 }),
          this.answerRepo.create({ text: 'Peer evaluation', points: 1 }),
          this.answerRepo.create({ text: 'No feedback', points: 0 }),
          this.answerRepo.create({ text: 'Grading only at the end', points: 0 }),
        ],
      },
      
      {
        text: 'What sets experiential learning apart?',
        type: 'single',
        answers: [
          this.answerRepo.create({ text: 'It’s only lectures', points: 0 }),
          this.answerRepo.create({ text: 'It involves doing and reflecting', points: 1 }),
          this.answerRepo.create({ text: 'It avoids testing', points: 0 }),
          this.answerRepo.create({ text: 'It relies on memorization', points: 0 }),
        ],
      },
      
      {
        text: 'Which of these are common features in Capsim tools?',
        type: 'multiple',
        answers: [
          this.answerRepo.create({ text: 'Interactive decisions', points: 1 }),
          this.answerRepo.create({ text: 'Automated feedback', points: 1 }),
          this.answerRepo.create({ text: 'Multiple email threads', points: 1 }),
          this.answerRepo.create({ text: 'Video editing', points: 0 }),
        ],
      },
      
      {
        text: 'Which of these are bad study habits?',
        type: 'multiple',
        answers: [
          this.answerRepo.create({ text: 'Cramming at night', points: 0 }),
          this.answerRepo.create({ text: 'Skipping breaks', points: 0 }),
          this.answerRepo.create({ text: 'Repetition and sleep', points: 1 }),
          this.answerRepo.create({ text: 'Distributed practice', points: 1 }),
        ],
      },
      
      {
        text: 'Which team roles are simulated in business games?',
        type: 'multiple',
        answers: [
          this.answerRepo.create({ text: 'CEO', points: 1 }),
          this.answerRepo.create({ text: 'Marketing Manager', points: 1 }),
          this.answerRepo.create({ text: 'Accountant', points: 1 }),
          this.answerRepo.create({ text: 'Video Editor', points: 0 }),
        ],
      },
      
      {
        text: 'How does simulation-based hiring benefit companies?',
        type: 'single',
        answers: [
          this.answerRepo.create({ text: 'It’s expensive and inefficient', points: 0 }),
          this.answerRepo.create({ text: 'It reveals skills in context', points: 1 }),
          this.answerRepo.create({ text: 'It replaces resumes completely', points: 0 }),
          this.answerRepo.create({ text: 'It’s mostly guesswork', points: 0 }),
        ],
      },
      
      {
        text: 'What’s a sign of reflective thinking in assessments?',
        type: 'single',
        answers: [
          this.answerRepo.create({ text: 'Quick decision and forget', points: 0 }),
          this.answerRepo.create({ text: 'Pausing to review consequences', points: 1 }),
          this.answerRepo.create({ text: 'Replaying answers over and over', points: 0 }),
          this.answerRepo.create({ text: 'Avoiding feedback', points: 0 }),
        ],
      },
      
      {
        text: 'What is the best way to promote growth mindset?',
        type: 'multiple',
        answers: [
          this.answerRepo.create({ text: 'Praise effort over outcome', points: 1 }),
          this.answerRepo.create({ text: 'Punish mistakes harshly', points: 0 }),
          this.answerRepo.create({ text: 'Encourage reflection', points: 1 }),
          this.answerRepo.create({ text: 'Avoid challenges', points: 0 }),
        ],
      },
      
      {
        text: 'Which soft skills are often assessed in CapsimInbox?',
        type: 'multiple',
        answers: [
          this.answerRepo.create({ text: 'Decision-making', points: 1 }),
          this.answerRepo.create({ text: 'Time pressure handling', points: 1 }),
          this.answerRepo.create({ text: 'Personal finances', points: 0 }),
          this.answerRepo.create({ text: 'Programming logic', points: 0 }),
        ],
      },
      
      {
        text: 'Why use branching simulations like ModXM?',
        type: 'single',
        answers: [
          this.answerRepo.create({ text: 'For random guessing', points: 0 }),
          this.answerRepo.create({ text: 'To explore decision trees and consequences', points: 1 }),
          this.answerRepo.create({ text: 'To avoid testing', points: 0 }),
          this.answerRepo.create({ text: 'Because it’s shorter', points: 0 }),
        ],
      },
      
      {
        text: 'What boosts knowledge retention best?',
        type: 'multiple',
        answers: [
          this.answerRepo.create({ text: 'Active learning', points: 1 }),
          this.answerRepo.create({ text: 'Real-world scenarios', points: 1 }),
          this.answerRepo.create({ text: 'Repetition and feedback', points: 1 }),
          this.answerRepo.create({ text: 'Highlighting only', points: 0 }),
        ],
      },
      
      {
        text: 'Which of these are decision points in CapsimInbox?',
        type: 'multiple',
        answers: [
          this.answerRepo.create({ text: 'Responding to emails', points: 1 }),
          this.answerRepo.create({ text: 'Delegating tasks', points: 1 }),
          this.answerRepo.create({ text: 'Writing essays', points: 0 }),
          this.answerRepo.create({ text: 'Analyzing situations', points: 1 }),
        ],
      },
      
      {
        text: 'Which learning style is **NOT** supported by CapsimInbox?',
        type: 'single',
        answers: [
          this.answerRepo.create({ text: 'Kinesthetic decision-making', points: 0 }),
          this.answerRepo.create({ text: 'Visual interfaces', points: 0 }),
          this.answerRepo.create({ text: 'Lecture memorization only', points: 1 }),
          this.answerRepo.create({ text: 'Contextual simulation', points: 0 }),
        ],
      },
      
      {
        text: 'How can managers use simulation data for coaching?',
        type: 'multiple',
        answers: [
          this.answerRepo.create({ text: 'Identify behavioral patterns', points: 1 }),
          this.answerRepo.create({ text: 'Customize development plans', points: 1 }),
          this.answerRepo.create({ text: 'Ignore low performers', points: 0 }),
          this.answerRepo.create({ text: 'Use data for decisions', points: 1 }),
        ],
      },
      
    ];

    for (const q of questions) {
      const question = this.questionRepo.create({
        text: q.text,
        type: q.type,
        answers: q.answers.map((a) => this.answerRepo.create(a)),
      });
    
      await this.questionRepo.save(question); // ✅ cascade saves answers too
    }
    
  }
}
