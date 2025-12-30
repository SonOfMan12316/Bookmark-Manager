import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { User, UserSchema } from './entities/user.entity';
import { PasswordResetToken, PasswordResetTokenSchema } from './entities/password-reset-token.schema';
import { UserService } from './user.service';
import { LoggerModule } from '../../services/logger/logger.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: PasswordResetToken.name, schema: PasswordResetTokenSchema }
    ]),
    LoggerModule
  ],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {}
