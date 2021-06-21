import { NestFactory } from '@nestjs/core';

import { AppModule } from '../app.module';
import { TvMazeService } from '../tvmaze/tvmaze.service';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.createApplicationContext(AppModule);
  const tvMazeService = app.get(TvMazeService);
  await tvMazeService.updateShows();
  app.close();
}
bootstrap();
