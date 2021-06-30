import { NestFactory } from '@nestjs/core';

import { AppModule } from '../app.module';
import { PushSubscriptionService } from '../push_subscription/push_subscription.service';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.createApplicationContext(AppModule);
  const pushService = app.get(PushSubscriptionService);
  await pushService.sendNotificationToUser(1, {
    title: 'DAVE - S01E01',
    message:
      "Dave and Benny's friendship blossoms in strange and unexpected ways, leading them to confront questions of privilege, race, sexuality, and dermatology. Meanwhile, Mike's isolation deepens, and a chance encounter sheds light on the root of his anger.",
    icon: 'https://lini.s1acker.com/uploads/images/medium_portrait/320/801177.jpg',
    url: 'https://liniv2.s1acker.com/show/216',
    date: '2021-06-24T02:00:00.000Z',
  });
  app.close();
}
bootstrap();
