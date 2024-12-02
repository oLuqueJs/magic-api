import { Test } from '@nestjs/testing';
import { CardsController } from '../src/cards/cards.controller';
import { CardsService } from '../src/cards/cards.service';

describe('CardsController', () => {
    let cardsCtrlr: CardsController;
    let cardsService: CardsService;

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            controllers: [CardsController],
            providers: [CardsService],
        }).compile();

        cardsService = await moduleRef.resolve(CardsService);
        cardsCtrlr = await moduleRef.resolve(CardsController);
    });

    describe('findRandomCard', () => {
        it('should return a random card', async () => {
            const randomCard = await cardsCtrlr.findRandomCard();
            jest.spyOn(cardsService, 'findRandom').mockImplementation(() => randomCard);

            expect(await cardsCtrlr.findRandomCard()).toBe(randomCard);
        })
    });
})