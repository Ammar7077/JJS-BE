import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './entities/user.entity';
import { PopularSkills, popularSkillsSchema } from 'src/modules/popular-skills/entities/popular-skill.entity';
import { PopularPositions, popularPositionsSchema } from 'src/modules/popular-positions/entities/popular-position.entity';

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
      { name: PopularSkills.name, schema: popularSkillsSchema },
      { name: PopularPositions.name, schema: popularPositionsSchema }
    ]),
  ],
  exports: [MongooseModule, UserService]
})
export class UserModule {}
