import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { GarageFloorController } from './floor.controller';
import { GarageFloorService } from './floor.service';
import { GarageFloorSchema } from './floor.schema';
import { UserSchema } from '../user/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    MongooseModule.forFeature([
      { name: 'GarageFloor', schema: GarageFloorSchema },
    ]),
  ],
  controllers: [GarageFloorController],
  providers: [GarageFloorService],
  exports: [MongooseModule, GarageFloorService],
})
export class GarageFloorModule {}
