import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './entities/user.entity';
import { popularSkillsSchema } from 'src/modules/popular-skills/entities/popular-skill.entity';
import { popularPositionsSchema } from 'src/modules/popular-positions/entities/popular-position.entity';

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
      { name: 'popular-skills', schema: popularSkillsSchema },
      { name: 'popular-positions', schema: popularPositionsSchema }
    ]),
  ],
  exports: [MongooseModule, UserService]
})
export class UserModule {}
