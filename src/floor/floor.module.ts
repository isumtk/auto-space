import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { GarageFloorController } from './floor.controller';
import { FloorService } from './floor.service';
import { GarageFloorSchema } from './floor.schema';
import { UserSchema } from '../user/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    MongooseModule.forFeature([{ name: 'Floor', schema: GarageFloorSchema }]),
  ],
  controllers: [GarageFloorController],
  providers: [FloorService],
  exports: [MongooseModule, FloorService],
})
export class GarageFloorModule {}
