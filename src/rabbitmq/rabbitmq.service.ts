import { Injectable } from '@nestjs/common';

import * as amqp from 'amqplib';
import * as dotenv from 'dotenv'

dotenv.config();

const host = process.env.RABBITMQ_HOST;
const port = process.env.RABBITMQ_port;
const username = process.env.RABBITMQ_USERNAME;
const password = process.env.RABBITMQ_PASSWORD;
const queueName = process.env.RABBITMQ_QUEUE_NAME;


@Injectable()
export class RabbitMQService {
  private readonly queueName = 'video_upload';

  async publishMessage(message: any): Promise<void> {
    try {

      const connection = await amqp.connect(`amqp://${username}:${password}@${host}:${port}`);
      const channel = await connection.createChannel();
      await channel.assertQueue(queueName, { durable: false });
      console.log(channel, message)
      channel.sendToQueue(queueName, Buffer.from(message));
      console.log("Message sent to RabbitMQ:", message);
      await channel.close();
      await connection.close();
    } catch (error) {
      console.error("Error:", error);
    }

  }
}
