import { NestFactory } from '@nestjs/core';

import { AppModule } from '../app.module';
import { PushSubscriptionService } from '../push_subscription/push_subscription.service';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.createApplicationContext(AppModule);
  const pushService = app.get(PushSubscriptionService);
  await pushService.sendNotificationToUser(1, {
    title: 'WORKING',
    message: 'testing',
  });
  app.close();
}
bootstrap();
