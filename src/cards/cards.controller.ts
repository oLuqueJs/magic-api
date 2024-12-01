import { Controller, Get, Param } from '@nestjs/common';
import { CardsService } from './cards.service';

@Controller('cards')
export class CardsController {
  constructor(private readonly cardsService: CardsService) {}

  @Get('random-commander')
  async getRandomCommander() {
    return this.cardsService.getRandomCommander();
  }

  @Get('search/:commanderId')
  async searchCardsForCommander(@Param('commanderId') commanderId: string) {
    const commander = await this.cardsService.getCardById(commanderId);
    return this.cardsService.searchCardsForCommander(commander.colors);
  }
}
