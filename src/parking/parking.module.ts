import { Module } from '@nestjs/common';
import { ParkingSpaceService } from './parking.service';
import { ParkingSpaceController } from './parking.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ParkingSpaceSchema } from './parking.schema';
import { GarageFloorSchema } from './../floor/floor.schema';
import { FloorService } from './../floor/floor.service';
import { GarageFloorModule } from './../floor/floor.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Parking', schema: ParkingSpaceSchema },
    ]),
    MongooseModule.forFeature([{ name: 'Floor', schema: GarageFloorSchema }]),
    GarageFloorModule,
  ],
  providers: [ParkingSpaceService],
  controllers: [ParkingSpaceController],
  exports: [MongooseModule],
})
export class ParkingModule {}
