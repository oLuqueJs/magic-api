import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Deck } from './interfaces/deck.interface';
import { CardsService } from '../cards/cards.service';
import { RmqService } from '../rmq/rmq.service';

@Injectable()
export class DecksService {
  constructor(
    @InjectModel('Deck') private readonly deckModel: Model<Deck>,
    private readonly cardsService: CardsService,
    private readonly rmqService: RmqService,
  ) {}

  async createDeck(name: string, commanderId: string, cardIds: string[]) {
    const deck = new this.deckModel({
      name,
      commander: commanderId,
      cards: cardIds,
    });
    await deck.save();
    await this.rmqService.sendToQueue('deck_import_queue', { deckId: deck._id }, 5);
    return deck;
  }

  async createRandomDeck(name: string) {
    const commander = await this.cardsService.getRandomCommander();
    const cards = await this.cardsService.searchCardsForCommander(commander.colors);
    const cardIds = cards.slice(0, 99).map(card => card.id);

    return this.createDeck(name, commander.id, cardIds);
  }

  async getDeckById(deckId: string) {
    const deck = await this.deckModel.findById(deckId).populate('commander cards').exec();
    if (!deck) {
      throw new HttpException('Deck not found', HttpStatus.NOT_FOUND);
    }
    return deck;
  }

  async exportDeck(deckId: string) {
    const deck = await this.getDeckById(deckId);
    return {
      id: deck._id,
      name: deck.name,
      commander: deck.commander,
      cards: deck.cards,
    };
  }

  async importDeck(data: any) {
    const deck = new this.deckModel(data);
    await deck.save();
    return deck;
  }
}
