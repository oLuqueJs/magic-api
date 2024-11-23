import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiQuery } from '@nestjs/swagger';
import { CardsService } from './cards.service';
import { Card, SearchResponse } from './interface/cards.interface';

@ApiTags('Cards')
@Controller('cards')
export class CardsController {
  constructor(private readonly cardsService: CardsService) {}

  @Get('name/:name')
  @ApiOperation({ summary: 'Buscar uma carta pelo nome' })
  @ApiParam({ name: 'name', description: 'Nome da carta', example: 'Black Lotus' })
  async getCardByName(@Param('name') name: string): Promise<Card> {
    return this.cardsService.findCardByName(name);
  }

  @Get('search')
  @ApiOperation({ summary: 'Buscar cartas por uma query' })
  @ApiQuery({ name: 'q', description: 'Query de busca', example: 'type:creature color:green' })
  async searchCards(@Query('q') query: string): Promise<SearchResponse> {
    return this.cardsService.searchCards(query);
  }

  @Get('color/:color')
  @ApiOperation({ summary: 'Buscar cartas por cor' })
  @ApiParam({ name: 'color', description: 'Cor da carta (ex: red, blue)', example: 'red' })
  async getCardsByColor(@Param('color') color: string): Promise<SearchResponse> {
    return this.cardsService.findCardsByColor(color);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar uma carta pelo ID' })
  @ApiParam({ name: 'id', description: 'ID único da carta', example: '3f45a67e-dbf9-4e1d-92b7-3e17bdeac374' })
  async getCardById(@Param('id') id: string): Promise<Card> {
    return this.cardsService.findCardById(id);
  }

  @Get('random')
  @ApiOperation({ summary: 'Buscar uma carta aleatória' })
  async getRandomCard(): Promise<Card> {
    return this.cardsService.findRandomCard();
  }
}
