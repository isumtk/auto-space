import { Module } from '@nestjs/common';
import { ParkingSpaceService } from './parking.service';
import { ParkingSpaceController } from './parking.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ParkingSpaceSchema } from './parking.schema';
import { GarageFloorSchema } from 'src/floor/floor.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'ParkingSpace', schema: ParkingSpaceSchema },
    ]),
    MongooseModule.forFeature([
      { name: 'GarageFloor', schema: GarageFloorSchema },
    ]),
  ],
  providers: [ParkingSpaceService],
  controllers: [ParkingSpaceController],
  exports: [MongooseModule],
})
export class ParkingModule {}
