import { Body, Controller, Post, Patch, UseGuards } from '@nestjs/common';
import { GetUser } from '../auth/decorator';
import { JwtGuard } from '../auth/guard';
import { GarageFloorService } from './floor.service';
import { CreateGarageFloorDTO, UpdateGarageFloorDTO } from './dto';

@UseGuards(JwtGuard)
@Controller('floor')
export class GarageFloorController {
  constructor(private readonly garageFloorService: GarageFloorService) {}
  @Post('/create')
  addGarage(@GetUser('id') userID: string, @Body() dto: CreateGarageFloorDTO) {
    return this.garageFloorService.addGarageFloor(userID, dto);
  }

  @Patch('/update')
  updateGarage(
    @GetUser('id') userID: string,
    @Body() dto: UpdateGarageFloorDTO,
  ) {
    return this.garageFloorService.updateGarageFloor(userID, dto);
  }
}
