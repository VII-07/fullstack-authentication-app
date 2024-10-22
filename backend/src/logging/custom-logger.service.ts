import { Injectable, Inject } from '@nestjs/common';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

@Injectable()
export class CustomLoggerService {
  constructor(
    @Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: Logger,
  ) {}

  info(message: string, context?: string) {
    this.logger.log('info', message, { context });
  }

  warn(message: string, context?: string) {
    this.logger.log('warn', message, { context });
  }

  error(message: string, trace?: string, context?: string) {
    this.logger.log('error', message, { trace, context });
  }

  debug(message: string, context?: string) {
    this.logger.log('debug', message, { context });
  }

  verbose(message: string, context?: string) {
    this.logger.log('verbose', message, { context });
  }
}
