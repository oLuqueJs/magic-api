import { Test } from '@nestjs/testing';
import { CommandersController } from '../src/commanders/commanders.controller';
import { CommandersService } from '../src/commanders/commanders.service';

describe('CommandersController', () => {
    let commandersCtrlr: CommandersController;
    let commandersService: CommandersService;

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            controllers: [CommandersController],
            providers: [CommandersService],
        }).compile();

        commandersService = await moduleRef.resolve(CommandersService);
        commandersCtrlr = await moduleRef.resolve(CommandersController);
    });

    describe('getCommanderById', () => {
        it('should return an especific commander, by its ID', async () => {
            const commander = await commandersCtrlr.getCommanderById("1");
            jest.spyOn(commandersService, 'findRandom').mockImplementation(() => commander);

            expect(await commandersCtrlr.getCommanderById("1")).toBe(commander);
        })
    });
})