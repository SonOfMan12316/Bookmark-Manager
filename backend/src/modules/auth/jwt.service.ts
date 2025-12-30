import { Injectable } from '@nestjs/common';
import { JwtService as NestJwtService } from '@nestjs/jwt';
import { AppConfig } from 'src/app.config';

export interface JwtPayload {
  sub: string;
  email: string;
}

@Injectable()
export class AuthJwtService {
  constructor(
    private nestJwtService: NestJwtService,
  ) {}

  async generateToken(userId: string, email: string): Promise<string> {
    const payload: JwtPayload = { sub: userId, email };
    const config = AppConfig();
    return this.nestJwtService.signAsync(payload, {
      secret: config.JWT_SECRET as string,
      expiresIn: (config.JWT_EXPIRES_IN || '7d') as any,
    });
  }

  async verifyToken(token: string): Promise<JwtPayload> {
    const config = AppConfig();
    return this.nestJwtService.verifyAsync<JwtPayload>(token, {
      secret: config.JWT_SECRET as string,
    });
  }
}
