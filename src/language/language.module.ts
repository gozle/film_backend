import { Module } from '@nestjs/common';
import { LanguageService } from './language.service';
import { LanguageController } from './language.controller';
import { UserModule } from 'src/user/user.module';

@Module({

  controllers: [LanguageController],
  providers: [LanguageService],
})
export class LanguageModule { }
