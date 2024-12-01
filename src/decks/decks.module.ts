import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DecksController } from './decks.controller';
import { DecksService } from './decks.service';
import { DeckSchema } from './schema/deck.schema';
import { RmqModule } from '../rmq/rmq.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Deck', schema: DeckSchema }]),
    RmqModule,
  ],
  controllers: [DecksController],
  providers: [DecksService],
  exports: [DecksService],
})
export class DecksModule {}
