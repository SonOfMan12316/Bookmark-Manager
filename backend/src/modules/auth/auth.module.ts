import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { AppConfig } from 'src/app.config';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AuthJwtService } from './jwt.service';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      secret: AppConfig().JWT_SECRET as string,
      signOptions: { expiresIn: (AppConfig().JWT_EXPIRES_IN || '7d') as any },
    }),
  ],
  providers: [AuthService, AuthJwtService],
  controllers: [AuthController]
})
export class AuthModule {}
