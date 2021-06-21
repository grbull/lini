import { LoggerService } from '@nestjs/common';
import winston, { format, Logger, transports } from 'winston';

export class WinstonLogger implements LoggerService {
  constructor(private readonly logger: Logger) {}

  public log(message: string, context?: string): Logger {
    return this.logger.info(message, { context });
  }

  public error(message: string, trace?: string, context?: string): Logger {
    return this.logger.error(message, { trace, context });
  }

  public warn(message: string, context?: string): Logger {
    return this.logger.warn(message, { context });
  }

  public debug?(message: string, context?: string): Logger {
    return this.logger.debug(message, { context });
  }

  public verbose?(message: string, context?: string): Logger {
    return this.logger.verbose(message, { context });
  }
}

const logFormat = format.printf(({ level, message, timestamp, metadata }) => {
  const metaD = metadata;
  const context = metadata.context as string | undefined;
  const trace = metadata.trace;
  delete metaD.context;
  const meta = Object.keys(metadata).length > 0 ? JSON.stringify(metaD) : '';

  return `${level.toUpperCase()}: [${context}] ${message} ${meta} ${
    trace ? `\n${trace}` : ''
  }`;
});

export const MyLogger = new WinstonLogger(
  winston.createLogger({
    level: 'debug',
    format: format.combine(
      format.errors({ stack: true }),
      format.metadata(),
      format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
      logFormat
    ),
    transports: [new transports.Console()],
  })
);
