import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import axios from 'axios';
import { Card, SearchResponse } from './interface/cards.interface';

@Injectable()
export class CardsService {
  private readonly scryfallApiUrl = 'https://api.scryfall.com';

  async findCardByName(name: string): Promise<Card> {
    try {
      const response = await axios.get<Card>(`${this.scryfallApiUrl}/cards/named`, {
        params: { fuzzy: name },
      });
      return response.data;
    } catch (error) {
      if (error.response?.status === 404) {
        throw new HttpException('Carta não encontrada', HttpStatus.NOT_FOUND);
      }
      throw new HttpException('Erro ao buscar a carta', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async searchCards(query: string): Promise<SearchResponse> {
    try {
      const response = await axios.get<SearchResponse>(`${this.scryfallApiUrl}/cards/search`, {
        params: { q: query },
      });
      return response.data;
    } catch (error) {
      throw new HttpException('Erro ao realizar a busca', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findCardsByColor(color: string): Promise<SearchResponse> {
    try {
      const response = await axios.get<SearchResponse>(`${this.scryfallApiUrl}/cards/search`, {
        params: { q: `color:${color}` },
      });
      return response.data;
    } catch (error) {
      throw new HttpException('Erro ao buscar cartas por cor', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findCardById(id: string): Promise<Card> {
    try {
      const response = await axios.get<Card>(`${this.scryfallApiUrl}/cards/${id}`);
      return response.data;
    } catch (error) {
      if (error.response?.status === 404) {
        throw new HttpException('Carta não encontrada', HttpStatus.NOT_FOUND);
      }
      throw new HttpException('Erro ao buscar a carta', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findRandomCard(): Promise<Card> {
    try {
      const response = await axios.get<Card>(`${this.scryfallApiUrl}/cards/random`);
      return response.data;
    } catch (error) {
      throw new HttpException('Erro ao buscar uma carta aleatória', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
