import { Injectable, ConflictException, UnauthorizedException, BadRequestException, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { randomBytes } from 'crypto';
import * as bcrypt from 'bcrypt';
import { UserService } from '../user/user.service';
import { MailService } from 'src/services/mail/mail.service';
import { AuthJwtService } from './jwt.service';
import { PasswordResetToken } from '../user/entities/password-reset-token.schema';
import { SignupDto } from './dto/signup.dto';
import { LoggedInUserDto } from './dto/logged-in-user.dto';
import { TokenDto } from './dto/token.dto';
import { UserDataDto } from '../user/dto/user-data.dto';
import { LoginDto } from './dto/login.dto';
import { InjectModel } from '@nestjs/mongoose';
import { APIResponseDto } from 'src/resources/dto/api-response.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private mailService: MailService,
    private jwtService: AuthJwtService,
    @InjectModel(PasswordResetToken.name) private passwordResetTokenModel: Model<PasswordResetToken>
  ) {
  }

  async signUp(signUpDto: SignupDto): Promise<LoggedInUserDto> {
    const existingUser = await this.usersService.findByEmail(signUpDto.email);
    if(existingUser) throw new ConflictException('Email already exists');

    const hashedPassword = await bcrypt.hash(signUpDto.password, 10);
    
    const user = await this.usersService.create({
      email: signUpDto.email,
      password: hashedPassword,
      fullName: signUpDto.fullName,
    });

    const token = await this.jwtService.generateToken(user._id.toString(), user.email);

    return new LoggedInUserDto(new UserDataDto(user), new TokenDto(token, token));
  }

  async login(loginDto: LoginDto): Promise<LoggedInUserDto> {
    const { email, password } = loginDto;
    const user = await this.usersService.findByEmail(email);
    if(!user) throw new UnauthorizedException('Invalid credentials');
    
    const isPasswordValid = await this.usersService.verifyPassword(password, user.password);
    if(!isPasswordValid) throw new UnauthorizedException('Invalid credentials');
    
    const token = await this.jwtService.generateToken(user._id.toString(), user.email);
    
    return new LoggedInUserDto(new UserDataDto(user), new TokenDto(token, token));
  }

  async forgotPassword(email: string): Promise<APIResponseDto> {
    const user = await this.usersService.findByEmail(email);
    if(!user) return new APIResponseDto('If the email exists, a password reset link has been sent')

    const resetToken = randomBytes(32).toString('hex');
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 1)

    await this.passwordResetTokenModel.deleteMany({ userId: user._id }).exec();

    await this.passwordResetTokenModel.create({
      userId: user._id,
      token: resetToken,
      expiresAt
    })

    try {
      await this.mailService.sendPasswordResetEmail(user.email, resetToken)
    } catch (error) {
      await this.passwordResetTokenModel.deleteOne({ token: resetToken }).exec();
      throw new BadRequestException('Failed to send password reset email');
    }

    return new APIResponseDto('If the email exists, a password reset link has been sent')
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto): Promise<APIResponseDto> {
    const resetTokenDoc = await this.passwordResetTokenModel.findOne({
      token: resetPasswordDto.token
    }).exec();

    if(!resetTokenDoc) throw new BadRequestException('Invalid or expired reset token');

    if (new Date() > resetTokenDoc.expiresAt) {
      await this.passwordResetTokenModel.deleteOne({ token: resetPasswordDto.token }).exec();
      throw new BadRequestException('Reset token has expired');
    }

    await this.usersService.updatePassword(resetTokenDoc.userId.toString(), resetPasswordDto.newPassword);

    await this.passwordResetTokenModel.deleteOne({ token: resetPasswordDto.token }).exec();

    return new APIResponseDto('Password has been reset successfully');
  }

  async getCurrentUser(userId: string) {
    const user = await this.usersService.findById(userId);
    if(!user) throw new NotFoundException('User not found');

    return {
      id: user._id.toString(),
      email: user.email,
      fullName: user.fullName,
      emailVerified: user.emailVerified
    }
  }
}
