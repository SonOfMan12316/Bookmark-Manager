import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GoogleAuthDto {
  @ApiProperty({
    example: '4/0AX4XfWj...',
    description: 'Authorization code from Google OAuth popup flow'
  })
  @IsString()
  @IsNotEmpty()
  code: string;
}
