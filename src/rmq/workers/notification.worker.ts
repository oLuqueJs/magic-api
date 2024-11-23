import { Injectable } from '@nestjs/common';
import { RmqService } from '../rmq.service';

@Injectable()
export class NotificationWorker {
  constructor(private readonly rmqService: RmqService) {}

  async start() {
    await this.rmqService.consume('deck_updates_queue', (message) => {
      const { deckId, status } = message;
      console.log(`Notification: Deck ${deckId} is ${status}`);
    });
  }
}
