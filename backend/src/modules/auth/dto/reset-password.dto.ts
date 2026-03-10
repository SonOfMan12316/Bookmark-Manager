import { IsNotEmpty, IsString, MinLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class ResetPasswordDto {
  @ApiProperty({
    example: "abc123def456ghi789",
    description: "Password reset token received via email"
  })
  @IsString()
  @IsNotEmpty()
  token: string;

  @ApiProperty({
    example: "NewSecurePassword123!",
    description: "New password (minimum 8 characters)",
    minLength: 8
  })
  @IsString()
  @MinLength(8)
  @IsNotEmpty()
  newPassword: string;
}
