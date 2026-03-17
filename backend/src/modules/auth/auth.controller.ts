import { Controller, Post, Get, Body, Req, UseGuards, HttpStatus } from '@nestjs/common';
import { Request } from 'express';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { LoggedInUserDto } from './dto/logged-in-user.dto';
import { LoginDto } from './dto/login.dto';
import { UserDataDto } from '../user/dto/user-data.dto';
import { JwtAuthGuard } from './guards/jwt-auth/jwt-auth.guard';
import { JwtPayload } from './jwt.service';
import { GoogleAuthDto } from './dto/google-auth.dto';

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

  @Post('google')
  @ApiOperation({ summary: 'Sign in with Google', description: 'Authenticates a user using Google OAuth and returns user data with authentication tokens' })
  @ApiBody({ type: GoogleAuthDto })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'User successfully authenticated with Google',
    type: LoggedInUserDto,
    example: {
      user: {
        id: "507f1f77bcf86cd799439011",
        fullName: "John Doe",
        email: "john.doe@example.com",
        emailVerified: true
      },
      tokens: {
        accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
        refreshToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
      }
    }
  })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Invalid Google token' })
  async googleAuth(@Body() googleAuthDto: GoogleAuthDto): Promise<LoggedInUserDto> {
    return this.authService.googleAuth(googleAuthDto)
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
