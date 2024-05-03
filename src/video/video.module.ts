import { Module } from '@nestjs/common';
import { VideoService } from './video.service';
import { VideoController } from './video.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'VIDEO_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://127.0.0.1:15672'],
          queue: 'videos',
          queueOptions: {
            durable: false
          },
        },
      },
    ]),
  ],
  controllers: [VideoController],
  providers: [VideoService],
})
export class VideoModule { }
