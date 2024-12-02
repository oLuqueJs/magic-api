import { Test } from '@nestjs/testing';
import { DecksController } from '../src/decks/decks.controller';
import { DecksService } from '../src/decks/decks.service';

describe('DecksController', () => {
    let decksCtrlr: DecksController;
    let decksService: DecksService;

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            controllers: [DecksController],
            providers: [DecksService],
        }).compile();

        decksService = await moduleRef.resolve(DecksService);
        decksCtrlr = await moduleRef.resolve(DecksController);
    });

    describe('createDeck', () => {
        it('should create a Deck of cards', async () => {
            const createdDeck = await decksCtrlr.createDeck(name);
            jest.spyOn(decksService, 'createDeck').mockImplementation(() => createdDeck);

            expect(await decksCtrlr.createDeck()).toBe(createdDeck);
        })
    });
})