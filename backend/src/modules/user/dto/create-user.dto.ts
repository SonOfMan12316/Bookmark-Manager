import { Type } from "class-transformer";
import { IsEmail, IsNotEmpty, IsString, MinLength, IsOptional, IsBoolean } from "class-validator";

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @MinLength(8)
  @IsOptional()
  password?: string;

  @IsString()
  @IsOptional()
  googleId?: string;

  @IsBoolean()
  @IsOptional()
  emailVerified?: boolean;
}