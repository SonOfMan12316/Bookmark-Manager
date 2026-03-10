import { ApiProperty } from "@nestjs/swagger";

export class APIResponseDto {
  @ApiProperty({
    example: "Password reset email sent successfully",
    description: "Response message"
  })
  message: string;

  constructor(message: string) {
      this.message = message;
  }
}