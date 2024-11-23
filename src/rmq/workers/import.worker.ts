import { Injectable } from '@nestjs/common';
import { RmqService } from '../rmq.service';
import { DecksService } from 'src/decks/decks.service';

@Injectable()
export class ImportWorker {
  constructor(private readonly rmqService: RmqService, private readonly decksService: DecksService) {}

  async start() {
    await this.rmqService.consume('deck_import_queue', async (message) => {
      const { deckId } = message;
      const deck = await this.decksService.processDeckImport(deckId);
      console.log(`Deck ${deckId} processed.`);
      await this.rmqService.sendToQueue('deck_updates_queue', { deckId, status: 'processed' });
    });
  }
}
