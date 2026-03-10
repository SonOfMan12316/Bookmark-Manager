import { ApiProperty } from "@nestjs/swagger";
import { User } from "../entities/user.entity";
import { Types } from "mongoose";

export class UserDataDto {
  @ApiProperty({
    example: "507f1f77bcf86cd799439011",
    description: "User's unique identifier"
  })
  id: string;

  @ApiProperty({
    example: "John Doe",
    description: "User's full name"
  })
  fullName: string;

  @ApiProperty({
    example: "john.doe@example.com",
    description: "User's email address"
  })
  email: string;

  @ApiProperty({
    example: false,
    description: "Whether the user's email has been verified"
  })
  emailVerified: boolean;

  constructor(user: User & { _id?: any }) {
    this.id = user._id?.toString?.() ?? '';
    this.email = user.email;
    this.fullName = user.fullName;
    this.emailVerified = user.emailVerified;
  }
}