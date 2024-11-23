import { Module, OnModuleInit } from '@nestjs/common';
import { RmqService } from './rmq.service';

@Module({
  providers: [RmqService],
  exports: [RmqService],
})
export class RmqModule implements OnModuleInit {
  constructor(private readonly rmqService: RmqService) {}

  async onModuleInit() {
    await this.rmqService.connect();
  }
}
