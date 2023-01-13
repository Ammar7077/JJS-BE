import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Position, PositionSchema } from 'src/shared/entities/position.entity';
import { Skill, SkillSchema } from 'src/shared/entities/skill.entity';
import { User, UserSchema } from './entities/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
      { name: Position.name, schema: PositionSchema },
      { name: Skill.name, schema: SkillSchema },
    ]),
  ],
  exports: [MongooseModule, UserService],
})
export class UserModule {}
