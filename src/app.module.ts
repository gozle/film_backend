import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './db/db.module';
import { VideoModule } from './video/video.module';
import { UserModule } from './user/user.module';
import { AdminModule } from './admin/admin.module';
import { AuthModule } from './auth/auth.module';
import { GiftModule } from './gift/gift.module';
import { PremiumModule } from './premium/premium.module';

@Module({
  imports: [DatabaseModule, AuthModule, VideoModule, UserModule, AdminModule, GiftModule, PremiumModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
