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
import { GarageFloor } from './floor.schema';

@Injectable()
export class GarageFloorService {
  constructor(
    @InjectModel('User') private readonly user: Model<User>,
    @InjectModel('GarageFloor')
    private readonly garageFloor: Model<GarageFloor>,
  ) {}
  async addGarageFloor(userID: string, dto: CreateGarageFloorDTO) {
    try {
      const owner = await this.user.findById(userID).select('').exec();
      const payload = { ...dto, owner };
      const garageFloor = await this.garageFloor.create(payload);
      return garageFloor;
    } catch (error: any) {
      throw new BadRequestException(error);
    }
  }

  async updateGarageFloor(userID: string, dto: UpdateGarageFloorDTO) {
    try {
      const data = await this.garageFloor
        .findById(dto.floorID)
        .where('owner')
        .equals({ _id: userID })
        .exec();

      if (!data) {
        return new ForbiddenException('Access Denied');
      }

      const garageFloor = await this.garageFloor.findByIdAndUpdate(
        dto.floorID,
        dto,
        { new: true },
      );

      return garageFloor;
    } catch (error) {
      console.log({ error });
      //throw new HttpException();
    }
  }
}
