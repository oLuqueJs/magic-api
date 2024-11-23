import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import axios from 'axios';
import { RmqService } from '../rmq/rmq.service';
import { Card } from 'src/cards/interface/cards.interface';

@Injectable()
export class DecksService {
  private readonly scryfallApiUrl = 'https://api.scryfall.com';

  constructor(
    @InjectModel('Deck') private readonly deckModel: Model<any>,
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
    const commanderResponse = await axios.get<Card>(`${this.scryfallApiUrl}/cards/random`, {
      params: { q: 'is:commander' },
    });
    const commander = commanderResponse.data;

    const cardsResponse = await axios.get<{ data: Card[] }>(`${this.scryfallApiUrl}/cards/search`, {
      params: { q: `color<=${commander.colors.join(',')}` },
    });
    const cardIds = cardsResponse.data.data.slice(0, 99).map((card) => card.id);

    return this.createDeck(name, commander.id, cardIds);
  }

  async exportDeck(deckId: string) {
    const deck = await this.deckModel.findById(deckId).populate('commander cards').exec();
    if (!deck) {
      throw new Error('Deck não encontrado');
    }
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

  async processDeckImport(deckId: string) {
    const deck = await this.deckModel.findById(deckId).exec();
    if (!deck) {
      throw new Error(`Deck ${deckId} não encontrado`);
    }
    return deck;
  }
}
