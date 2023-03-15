import { Injectable } from '@nestjs/common';
import { CreateParkingSpaceDTO, DeleteParkingSpaceDTO } from './dto';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Parking } from './parking.schema';
import { FloorService } from './../floor/floor.service';
import { UpdateParkingSpaceDTO } from './dto';

@Injectable()
export class ParkingSpaceService {
  constructor(
    @InjectModel('Parking') private readonly parking: Model<Parking>,
    private readonly floorService: FloorService,
  ) {}
  async generateParkingSpace(dto: CreateParkingSpaceDTO): Promise<Parking[]> {
    const spaces = [];
    const floor = await this.floorService.findFloor(dto);
    for (let i = 0; i < dto.spaces; i++) {
      spaces.push(new this.parking({ floor: floor._id }));
    }
    return await this.parking.create(spaces);
  }

  async modifyParkingSpace(userID: string, dto: UpdateParkingSpaceDTO) {
    const floorID = await this.floorService.fetchFloorOwner(dto.floorID);
    if (userID === floorID.toString()) {
      console.log('Yes');
      const updatedParking = await this.parking.findByIdAndUpdate(
        dto.parkingID,
        dto,
        { new: true },
      );

      return updatedParking;
    }
  }

  async deleteParkingSpace(userID: string, dto: DeleteParkingSpaceDTO) {
    const floorID = await this.floorService.fetchFloorOwner(dto.floorID);
    if (userID === floorID.toString()) {
      const deleteParking = await this.parking.findByIdAndDelete(dto.parkingID);
      return deleteParking;
    }
  }
}
