import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PasswordResetToken, PasswordResetTokenSchema } from '../user/entities/password-reset-token.schema';
import { AppConfig } from 'src/app.config';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AuthJwtService } from './jwt.service';
import { MailModule } from '../../services/mail/mail.module';

@Module({
  imports: [
    UserModule,
    MailModule,
    JwtModule.register({
      secret: AppConfig().JWT_SECRET as string,
      signOptions: { expiresIn: (AppConfig().JWT_EXPIRES_IN || '7d') as any },
    }),
    MongooseModule.forFeature([{ name: PasswordResetToken.name, schema: PasswordResetTokenSchema }]),
  ],
  providers: [AuthService, AuthJwtService],
  controllers: [AuthController]
})
export class AuthModule {}
