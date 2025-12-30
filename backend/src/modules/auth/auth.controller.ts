import { Controller, Post, Get, Body, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { APIResponseDto } from 'src/resources/dto/api-response.dto';
import { LoggedInUserDto } from './dto/logged-in-user.dto';
import { LoginDto } from './dto/login.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { UserDataDto } from '../user/dto/user-data.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { JwtAuthGuard } from './guards/jwt-auth/jwt-auth.guard';
import { JwtPayload } from './jwt.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService
  ) {}

  @Post('signup')
  async signUp(@Body() signupDto: SignupDto): Promise<LoggedInUserDto> {
    return this.authService.signUp(signupDto)
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<LoggedInUserDto> {
    return this.authService.login(loginDto)
  }

  @Post('forgot-password')
  async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto): Promise<APIResponseDto> {
    return this.authService.forgotPassword(forgotPasswordDto.email)
  }

  @Post('reset-password')
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto): Promise<APIResponseDto> {
    return this.authService.resetPassword(resetPasswordDto)
  }

  @Get('current-user')
  @UseGuards(JwtAuthGuard)
  async getCurrentUser(@Req() request: Request & { user: JwtPayload }): Promise<UserDataDto> {
    return this.authService.getCurrentUser(request.user.sub)
  }
}
