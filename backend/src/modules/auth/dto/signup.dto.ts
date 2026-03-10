import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class SignupDto {
  @ApiProperty({
    example: "John Doe",
    description: "User's full name"
  })
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @ApiProperty({
    example: "john.doe@example.com",
    description: "User's email address"
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;
  
  @ApiProperty({
    example: "SecurePassword123!",
    description: "User's password (minimum 8 characters)",
    minLength: 8
  })
  @IsString()
  @MinLength(8)
  @IsNotEmpty()
  password: string;
}
