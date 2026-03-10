import { IsEmail, IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class ForgotPasswordDto {
  @ApiProperty({
    example: "john.doe@example.com",
    description: "User's email address to send password reset link"
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
