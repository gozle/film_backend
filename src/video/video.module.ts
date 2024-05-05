import { Module } from '@nestjs/common';
import { VideoService } from './video.service';
import { VideoController } from './video.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { RabbitMQService } from 'src/rabbitmq/rabbitmq.service';



@Module({
  controllers: [VideoController],
  providers: [VideoService, RabbitMQService],
})
export class VideoModule { }
