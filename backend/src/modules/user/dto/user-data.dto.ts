import { User } from "../entities/user.entity";
import { Types } from "mongoose";

export class UserDataDto {
  id: string;
  fullName: string;
  email: string;
  emailVerified: boolean;

  constructor(user: User & { _id?: any }) {
    this.id = user._id?.toString?.() ?? '';
    this.email = user.email;
    this.fullName = user.fullName;
    this.emailVerified = user.emailVerified;
  }
}