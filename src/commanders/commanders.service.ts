import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import axios from 'axios';
import { Card } from 'src/cards/interface/cards.interface';

@Injectable()
export class CommandersService {
  private readonly scryfallApiUrl = 'https://api.scryfall.com';

  async getCommanderById(scryfallId: string): Promise<Card> {
    try {
      const response = await axios.get<Card>(`${this.scryfallApiUrl}/cards/${scryfallId}`);
      if (!response.data.type_line.includes('Legendary')) {
        throw new HttpException('Carta não é um comandante válido', HttpStatus.BAD_REQUEST);
      }
      return response.data;
    } catch (error) {
      if (error.response?.status === 404) {
        throw new HttpException('Comandante não encontrado', HttpStatus.NOT_FOUND);
      }
      throw new HttpException('Erro ao buscar o comandante', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getRandomCommander(): Promise<Card> {
    try {
      const response = await axios.get<Card>(`${this.scryfallApiUrl}/cards/random`, {
        params: { q: 'is:commander' },
      });
      return response.data;
    } catch (error) {
      throw new HttpException('Erro ao buscar um comandante aleatório', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
