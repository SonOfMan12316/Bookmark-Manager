import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { APIResponseDto } from './resources/dto/api-response.dto';
import { Public } from './resources/constants/public-decorator.constants';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Public()
  @Get()
  getHealth(): APIResponseDto {
    return { message: 'Health check OK' };
  }
}
