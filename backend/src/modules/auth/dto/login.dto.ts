import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class LoginDto {
  @ApiProperty({
    example: "john.doe@example.com",
    description: "User's email address"
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: "SecurePassword123!",
    description: "User's password"
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
