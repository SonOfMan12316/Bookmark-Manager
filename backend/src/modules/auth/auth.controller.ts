import { Controller, Post, Get, Body, Req, UseGuards, HttpStatus } from '@nestjs/common';
import { Request } from 'express';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
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

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService
  ) {}

  @Post('signup')
  @ApiOperation({ summary: 'Register a new user', description: 'Creates a new user account and returns user data with authentication tokens' })
  @ApiBody({ type: SignupDto })
  @ApiResponse({ 
    status: HttpStatus.CREATED, 
    description: 'User successfully registered',
    type: LoggedInUserDto,
    example: {
      user: {
        id: "507f1f77bcf86cd799439011",
        fullName: "John Doe",
        email: "john.doe@example.com",
        emailVerified: false
      },
      tokens: {
        accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
        refreshToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
      }
    }
  })
  @ApiResponse({ status: HttpStatus.CONFLICT, description: 'Email already exists' })
  async signUp(@Body() signupDto: SignupDto): Promise<LoggedInUserDto> {
    return this.authService.signUp(signupDto)
  }

  @Post('login')
  @ApiOperation({ summary: 'Login user', description: 'Authenticates a user and returns user data with authentication tokens' })
  @ApiBody({ type: LoginDto })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'User successfully logged in',
    type: LoggedInUserDto,
    example: {
      user: {
        id: "507f1f77bcf86cd799439011",
        fullName: "John Doe",
        email: "john.doe@example.com",
        emailVerified: false
      },
      tokens: {
        accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
        refreshToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
      }
    }
  })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Invalid credentials' })
  async login(@Body() loginDto: LoginDto): Promise<LoggedInUserDto> {
    return this.authService.login(loginDto)
  }

  @Post('forgot-password')
  @ApiOperation({ summary: 'Request password reset', description: 'Sends a password reset email to the user' })
  @ApiBody({ type: ForgotPasswordDto })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'Password reset email sent successfully',
    type: APIResponseDto,
    example: {
      message: "Password reset email sent successfully"
    }
  })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'User not found' })
  async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto): Promise<APIResponseDto> {
    return this.authService.forgotPassword(forgotPasswordDto.email)
  }

  @Post('reset-password')
  @ApiOperation({ summary: 'Reset password', description: 'Resets user password using the token received via email' })
  @ApiBody({ type: ResetPasswordDto })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'Password reset successfully',
    type: APIResponseDto,
    example: {
      message: "Password reset successfully"
    }
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Invalid or expired token' })
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto): Promise<APIResponseDto> {
    return this.authService.resetPassword(resetPasswordDto)
  }

  @Get('current-user')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get current user', description: 'Returns the authenticated user\'s data. Requires JWT token in Authorization header.' })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'Current user data',
    type: UserDataDto,
    example: {
      id: "507f1f77bcf86cd799439011",
      fullName: "John Doe",
      email: "john.doe@example.com",
      emailVerified: false
    }
  })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized - Invalid or missing token' })
  async getCurrentUser(@Req() request: Request & { user: JwtPayload }): Promise<UserDataDto> {
    return this.authService.getCurrentUser(request.user.sub)
  }
}
