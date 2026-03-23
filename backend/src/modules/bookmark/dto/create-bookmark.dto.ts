import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsArray } from 'class-validator';

export class CreateBookmarkDto {
  @ApiProperty({ example: 'React Docs' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: 'https://react.dev' })
  @IsString()
  @IsNotEmpty()
  url: string;

  @ApiPropertyOptional({ example: 'https://www.google.com/s2/favicons?domain=react.dev' })
  @IsString()
  @IsOptional()
  favicon?: string;

  @ApiPropertyOptional({ example: 'The official React documentation.' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({ type: [String], example: ['JavaScript', 'Framework'] })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  tags?: string[];
}
