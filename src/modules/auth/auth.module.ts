import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { UserModule } from '../system-users/user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Skills, SkillsSchema } from 'src/shared/entities/skills.entity';

@Module({
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.TOKEN_SECRET,
      signOptions: {
        expiresIn: process.env.EXPIRES_IN,
      },
    }),
    MongooseModule.forFeature([{ name: Skills.name, schema: SkillsSchema }]),
  ],
})
export class AuthModule {}
