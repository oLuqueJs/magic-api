import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CardsModule } from './cards/cards.module';
import { CommandersModule } from './commanders/commanders.module';
import { DecksModule } from './decks/decks.module';
import { RmqModule } from './rmq/rmq.module';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.DATABASE_URL || 'mongodb://mongo:27017/magicdb'),
    CardsModule,
    CommandersModule,
    DecksModule,
    RmqModule,
  ],
})
export class AppModule {}
