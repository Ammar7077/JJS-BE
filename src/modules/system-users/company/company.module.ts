import { Module } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyController } from './company.controller';
import { UserModule } from '../user/user.module';

@Module({
  controllers: [CompanyController],
  providers: [CompanyService],
  imports: [UserModule],
})
export class CompanyModule {}
