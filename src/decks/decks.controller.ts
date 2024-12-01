import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { DecksService } from './decks.service';

@Controller('decks')
export class DecksController {
  constructor(private readonly decksService: DecksService) {}

  @Post('create')
  async createDeck(@Body() createDeckDto: { name: string; commanderId: string; cardIds: string[] }) {
    return this.decksService.createDeck(createDeckDto.name, createDeckDto.commanderId, createDeckDto.cardIds);
  }

  @Post('create-random')
  async createRandomDeck(@Body('name') name: string) {
    return this.decksService.createRandomDeck(name);
  }

  @Get(':id')
  async getDeckById(@Param('id') id: string) {
    return this.decksService.getDeckById(id);
  }

  @Get('export/:id')
  async exportDeck(@Param('id') id: string) {
    return this.decksService.exportDeck(id);
  }
}
