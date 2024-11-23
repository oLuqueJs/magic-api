import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam } from '@nestjs/swagger';
import { CommandersService } from './commanders.service';
import { Card } from 'src/cards/interface/cards.interface';

@ApiTags('Commanders')
@Controller('commanders')
export class CommandersController {
  constructor(private readonly commandersService: CommandersService) {}

  @Get(':scryfallId')
  @ApiOperation({ summary: 'Buscar um comandante pelo ID' })
  @ApiParam({
    name: 'scryfallId',
    description: 'ID único do comandante na API Scryfall',
    example: '3f45a67e-dbf9-4e1d-92b7-3e17bdeac374',
  })
  async getCommanderById(@Param('scryfallId') scryfallId: string): Promise<Card> {
    return this.commandersService.getCommanderById(scryfallId);
  }

  @Get('random')
  @ApiOperation({ summary: 'Buscar um comandante aleatório' })
  async getRandomCommander(): Promise<Card> {
    return this.commandersService.getRandomCommander();
  }
}
