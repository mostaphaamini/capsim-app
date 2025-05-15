import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { QuestionsService } from './questions/questions.service';
import { NestExpressApplication } from '@nestjs/platform-express'; 
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const config = app.get(ConfigService);
  const port = config.get<number>('PORT') || 8080;
  const frontendOrigin = config.get<string>('FRONTEND_ORIGIN') || '*';
  const questionsService = app.get(QuestionsService);

  app.enableCors({
    origin: frontendOrigin,
  });

  await questionsService.seed(); // Auto seed
  app.setGlobalPrefix('api');
  app.useStaticAssets(join(__dirname, '..', 'public')); 
  
  await app.listen(port);
}
bootstrap();
