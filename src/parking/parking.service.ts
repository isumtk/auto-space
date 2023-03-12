import { Injectable } from '@nestjs/common';
import { CreateParkingSpaceDTO } from './dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ParkingSpace } from './parking.schema';
import { GarageFloor } from 'src/floor/floor.schema';

@Injectable()
export class ParkingSpaceService {
  constructor(
    @InjectModel('ParkingSpace') private readonly parking: Model<ParkingSpace>,
    @InjectModel('GarageFloor') private readonly floor: Model<GarageFloor>,
  ) {}
  async generateParkingSpace(
    dto: CreateParkingSpaceDTO,
  ): Promise<ParkingSpace[]> {
    console.log({ dto });
    const floor = await this.floor.findById(dto.floorID).select('').exec();
    const spaces = [];
    for (let i = 0; i < dto.spaces; i++) {
      spaces.push(new this.parking({ floor }));
    }
    return await this.parking.create(spaces);
  }
}
