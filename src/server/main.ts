import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory, Reflector } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import connectRedis from 'connect-redis';
import expressSession from 'express-session';
import helmet from 'helmet';
import redis from 'ioredis';
import passport from 'passport';

import { AppModule } from './app.module';
import { MyLogger } from './logger';

async function bootstrap(): Promise<void> {
  // Create a nestjs instance
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: MyLogger,
  });

  // Load env variables
  const configService: ConfigService = app.get(ConfigService);

  // Development only settings
  // https://github.com/expressjs/cors
  if (configService.get('NODE_ENV') === 'development') {
    app.enableCors({
      origin: configService.get('CLIENT_URL'),
      credentials: true,
    });
    // Productiopn only settings
  } else {
    app.set('trust proxy', true);
  }

  // Initialize express session using a redis store
  // https://github.com/expressjs/session
  // https://github.com/tj/connect-redis
  const RedisStore = connectRedis(expressSession);
  const oneMonthMs = 1000 * 60 * 60 * 24 * 30;
  app.use(
    expressSession({
      cookie: {
        path: '/',
        httpOnly: true,
        secure: configService.get('NODE_ENV') === 'production',
        signed: true,
        maxAge: oneMonthMs,
        sameSite:
          configService.get('NODE_ENV') === 'production' ? 'strict' : 'lax',
      },
      // Proxy is necessary for secure cookies
      proxy: configService.get('NODE_ENV') === 'production',
      name: configService.get('COOKIE_NAME'),
      resave: false,
      secret: configService.get('COOKIE_SECRET', 'not very secret'),
      saveUninitialized: false,
      store: new RedisStore({
        client: new redis({ keyPrefix: 'lini' }),
      }),
    })
  );

  // Initialize passport
  app.use(passport.initialize());
  app.use(passport.session());

  // Apply headers to increase security
  // https://github.com/helmetjs/helmet
  app.use(helmet());

  // Apply validation
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));

  // Apply class serializer
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  // Start nestjs
  const defaultPort = 3000;
  await app.listen(configService.get('SERVER_PORT', defaultPort));
}
bootstrap();
