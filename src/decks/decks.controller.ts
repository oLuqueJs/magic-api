import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody, ApiParam } from '@nestjs/swagger';
import { DecksService } from './decks.service';

@ApiTags('Decks')
@Controller('decks')
export class DecksController {
  constructor(private readonly decksService: DecksService) {}

  @Post('create')
  @ApiOperation({ summary: 'Criar um novo deck' })
  @ApiBody({
    description: 'Dados para criar um deck',
    schema: {
      example: {
        name: 'Meu Deck',
        commanderId: '123456',
        cardIds: ['78910', '111213', '141516'],
      },
    },
  })
  async createDeck(
    @Body() createDeckDto: { name: string; commanderId: string; cardIds: string[] },
  ) {
    return this.decksService.createDeck(createDeckDto.name, createDeckDto.commanderId, createDeckDto.cardIds);
  }

  @Post('create-random')
  @ApiOperation({ summary: 'Criar um deck aleatório' })
  @ApiBody({
    description: 'Nome do deck a ser criado',
    schema: {
      example: { name: 'Deck Aleatório' },
    },
  })
  async createRandomDeck(@Body('name') name: string) {
    return this.decksService.createRandomDeck(name);
  }

  @Get(':deckId/export')
  @ApiOperation({ summary: 'Exportar um deck para JSON' })
  @ApiParam({
    name: 'deckId',
    description: 'ID do deck que será exportado',
    example: '649e7301d4e842001f377a76',
  })
  async exportDeck(@Param('deckId') deckId: string) {
    return this.decksService.exportDeck(deckId);
  }

  @Post('import')
  @ApiOperation({ summary: 'Importar um deck de JSON' })
  @ApiBody({
    description: 'Dados do deck em JSON',
    schema: {
      example: {
        name: 'Deck Importado',
        commander: '123456',
        cards: ['78910', '111213', '141516'],
      },
    },
  })
  async importDeck(@Body() data: any) {
    return this.decksService.importDeck(data);
  }
}
