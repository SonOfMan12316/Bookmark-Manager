import { Injectable, ConflictException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';

import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { LoggerService } from 'src/services/logger/logger.service';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private logger: LoggerService
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    let user = await this.userModel.findOne({ email: createUserDto.email });

    if(user) {
      this.logger.error(`User with email ${createUserDto.email} already exists`)
      throw new ConflictException('Email already linked to another account');
    }
    let newUser = new this.userModel({ ...createUserDto });
    await newUser.save();
    this.logger.info(`User created: ${newUser.email}`);
    return newUser;
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email });
  }

  async findById(id: string) {
    return this.userModel.findById(id);
  }

  async updatePassword(userId: string, newPassword: string): Promise<void> {
    const user = await this.userModel.findById(userId);
    if (!user) throw new Error('User not found');

    const passwordHash = await bcrypt.hash(newPassword, 10);
    user.password = passwordHash;

    await user.save();
    this.logger.info(`Password updated for user: ${user.email}`);
  }

  async verifyPassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }
}
