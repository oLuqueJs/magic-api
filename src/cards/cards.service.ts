import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { Card } from './interface/cards.interface';

@Injectable()
export class CardsService {
  private readonly scryfallApiUrl = 'https://api.scryfall.com';

  constructor(private readonly httpService: HttpService) {}

  async getRandomCommander(): Promise<Card> {
    try {
      const response = await firstValueFrom(
        this.httpService.get(`${this.scryfallApiUrl}/cards/random`, {
          params: { q: 'is:commander' },
        }),
      );
      return response.data;
    } catch (error) {
      throw new Error('Erro ao buscar comandante aleatório');
    }
  }

  async searchCardsForCommander(commanderColors: string[]): Promise<Card[]> {
    try {
      const response = await firstValueFrom(
        this.httpService.get(`${this.scryfallApiUrl}/cards/search`, {
          params: {
            q: `color<=${commanderColors.join(',')}`,
          },
        }),
      );
      return response.data.data;
    } catch (error) {
      throw new Error('Erro ao buscar cartas para o comandante');
    }
  }

  async getCardById(cardId: string): Promise<Card> {
    try {
      const response = await firstValueFrom(
        this.httpService.get(`${this.scryfallApiUrl}/cards/${cardId}`),
      );
      return response.data;
    } catch (error) {
      throw new Error(`Erro ao buscar card com ID: ${cardId}`);
    }
  }
}
