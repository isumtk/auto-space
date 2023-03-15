import { Model } from 'mongoose';
import {
  BadRequestException,
  ForbiddenException,
  HttpException,
  Injectable,
} from '@nestjs/common';
import { CreateGarageFloorDTO, UpdateGarageFloorDTO } from './dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../user/user.schema';
import { Floor } from './floor.schema';

@Injectable()
export class FloorService {
  constructor(
    @InjectModel('User') private readonly user: Model<User>,
    @InjectModel('Floor')
    private readonly floor: Model<Floor>,
  ) {}
  async addGarageFloor(userID: string, dto: CreateGarageFloorDTO) {
    try {
      const owner = await this.user.findById(userID).select('').exec();
      const payload = { ...dto, owner };
      const garageFloor = await this.floor.create(payload);
      return garageFloor;
    } catch (error: any) {
      throw new BadRequestException(error);
    }
  }

  async findFloor(dto: any) {
    try {
      const floor = await this.floor.findOne(dto.ID).select('').exec();
      return floor;
    } catch (error: any) {
      console.log(error);
    }
  }

  async fetchFloorOwner(dto: any) {
    try {
      const floor = await this.floor.findById(dto).exec();
      return floor.owner._id;
    } catch (error: any) {
      console.log(error);
    }
  }

  async updateGarageFloor(userID: string, dto: UpdateGarageFloorDTO) {
    try {
      const data = await this.floor
        .findById(dto.floorID)
        .where('owner')
        .equals({ _id: userID })
        .exec();

      if (!data) {
        return new ForbiddenException('Access Denied');
      }

      const garageFloor = await this.floor.findByIdAndUpdate(dto.floorID, dto, {
        new: true,
      });

      return garageFloor;
    } catch (error) {
      console.log({ error });
      //throw new HttpException();
    }
  }
}
