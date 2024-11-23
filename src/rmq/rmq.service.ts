import { Injectable, Logger } from '@nestjs/common';
import * as amqp from 'amqplib';

@Injectable()
export class RmqService {
  private readonly logger = new Logger(RmqService.name);
  private connection: amqp.Connection;
  private channel: amqp.Channel;

  async connect(retryCount = 5, retryDelay = 3000) {
    const amqpUrl = process.env.RABBITMQ_URL || 'amqp://rabbitmq';

    for (let attempt = 1; attempt <= retryCount; attempt++) {
      try {
        this.logger.log(`Tentando conectar ao RabbitMQ (${attempt}/${retryCount})...`);
        this.connection = await amqp.connect(amqpUrl);
        this.channel = await this.connection.createChannel();
        this.logger.log('Conexão com RabbitMQ estabelecida com sucesso!');
        break;
      } catch (error) {
        this.logger.error(`Erro ao conectar ao RabbitMQ: ${error.message}`);
        if (attempt < retryCount) {
          this.logger.log(`Tentando novamente em ${retryDelay / 1000} segundos...`);
          await new Promise((res) => setTimeout(res, retryDelay));
        } else {
          throw new Error('Não foi possível conectar ao RabbitMQ após várias tentativas.');
        }
      }
    }
  }

  async sendToQueue(queue: string, message: object, priority = 0) {
    await this.channel.assertQueue(queue, { durable: true, maxPriority: 10 });
    this.channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)), { priority });
  }

  async consume(queue: string, callback: (msg: any) => void) {
    await this.channel.assertQueue(queue, { durable: true });
    this.channel.consume(queue, (msg) => {
      if (msg) {
        callback(JSON.parse(msg.content.toString()));
        this.channel.ack(msg);
      }
    });
  }
}
