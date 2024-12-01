import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DecksService } from './decks.service';
import { DecksController } from './decks.controller';
import { DeckSchema } from './schema/deck.schema';
import { CardsModule } from '../cards/cards.module';
import { RmqModule } from '../rmq/rmq.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Deck', schema: DeckSchema }]),
    CardsModule,
    RmqModule,
  ],
  providers: [DecksService],
  controllers: [DecksController],
})
export class DecksModule {}
