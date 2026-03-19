import { Injectable, ConflictException, UnauthorizedException, NotFoundException, BadRequestException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { OAuth2Client } from 'google-auth-library';
import { UserService } from '../user/user.service';
import { AuthJwtService } from './jwt.service';
import { SignupDto } from './dto/signup.dto';
import { LoggedInUserDto } from './dto/logged-in-user.dto';
import { TokenDto } from './dto/token.dto';
import { UserDataDto } from '../user/dto/user-data.dto';
import { LoginDto } from './dto/login.dto';
import { GoogleAuthDto } from './dto/google-auth.dto';
import { AppConfig } from 'src/app.config';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: AuthJwtService,
  ) {}

  async signUp(signUpDto: SignupDto): Promise<LoggedInUserDto> {
    const existingUser = await this.usersService.findByEmail(signUpDto.email);
    if (existingUser) {
      if (existingUser.googleId) {
        throw new ConflictException('This email is already registered with Google. Please sign in with Google.');
      }
      throw new ConflictException('Email already exists');
    }

    if (!signUpDto.password) {
      throw new BadRequestException('Password is required');
    }

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
    if (!user) throw new UnauthorizedException('Invalid credentials');

    if (!user.password) {
      throw new UnauthorizedException('This account uses Google sign-in. Please sign in with Google.');
    }

    const isPasswordValid = await this.usersService.verifyPassword(password, user.password);
    if (!isPasswordValid) throw new UnauthorizedException('Invalid credentials');

    const token = await this.jwtService.generateToken(user._id.toString(), user.email);
    return new LoggedInUserDto(new UserDataDto(user), new TokenDto(token, token));
  }

  async googleAuth(googleAuthDto: GoogleAuthDto): Promise<LoggedInUserDto> {
    const config = AppConfig();

    if (!config.GOOGLE_CLIENT_ID || !config.GOOGLE_CLIENT_SECRET) {
      throw new BadRequestException('Google OAuth is not configured');
    }

    const client = new OAuth2Client(
      config.GOOGLE_CLIENT_ID,
      config.GOOGLE_CLIENT_SECRET,
    );

    try {
      const { tokens } = await client.getToken({
        code: googleAuthDto.code,
        redirect_uri: 'postmessage',
      });

      if (!tokens.id_token) {
        throw new UnauthorizedException('Failed to get ID token from Google');
      }

      const ticket = await client.verifyIdToken({
        idToken: tokens.id_token,
        audience: config.GOOGLE_CLIENT_ID,
      });

      const payload = ticket.getPayload();
      if (!payload) {
        throw new UnauthorizedException('Invalid Google token');
      }

      const { sub: googleId, email, name } = payload;

      if (!email || !googleId) {
        throw new BadRequestException('Google account missing required information');
      }

      let user = await this.usersService.findByGoogleId(googleId);

      if (!user) {
        const existingUser = await this.usersService.findByEmail(email);

        if (existingUser) {
          existingUser.googleId = googleId;
          // Google OAuth emails are verified by default.
          existingUser.emailVerified = true;
          await existingUser.save();
          user = existingUser;
        } else {
          user = await this.usersService.create({
            email,
            fullName: name || email.split('@')[0],
            googleId,
            emailVerified: true,
          });
        }
      }

      const token = await this.jwtService.generateToken(user._id.toString(), user.email);
      return new LoggedInUserDto(new UserDataDto(user), new TokenDto(token, token));
    } catch (error) {
      if (error instanceof UnauthorizedException || error instanceof BadRequestException) {
        throw error;
      }
      throw new UnauthorizedException('Failed to authenticate with Google');
    }
  }

  async getCurrentUser(userId: string) {
    const user = await this.usersService.findById(userId);
    if (!user) throw new NotFoundException('User not found');

    return {
      id: user._id.toString(),
      email: user.email,
      fullName: user.fullName,
      emailVerified: Boolean(user.emailVerified),
    }
  }
}
