import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CommandersController } from './commanders.controller';
import { CommandersService } from './commanders.service';
import { CommanderSchema } from './schema/commander.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Commander', schema: CommanderSchema }])],
  controllers: [CommandersController],
  providers: [CommandersService],
})
export class CommandersModule {}
