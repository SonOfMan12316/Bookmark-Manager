import { Injectable } from '@nestjs/common';
import { LoggerService } from './services/logger/logger.service';
import { APIResponseDto } from './resources/dto/api-response.dto';
@Injectable()
export class AppService {
  constructor(private readonly logger: LoggerService) {}

  getHealth(): APIResponseDto{
    this.logger.info('Server is running')
    return new APIResponseDto('Server is healthy');
  }
}
