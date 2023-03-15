import { Body, Controller, Post, Patch, UseGuards, Get } from '@nestjs/common';
import { GetUser } from '../auth/decorator';
import { JwtGuard } from '../auth/guard';
import { FloorService } from './floor.service';
import { CreateGarageFloorDTO, UpdateGarageFloorDTO } from './dto';

@UseGuards(JwtGuard)
@Controller('floor')
export class GarageFloorController {
  constructor(private readonly floorService: FloorService) {}
  @Post('/create')
  addGarage(@GetUser('id') userID: string, @Body() dto: CreateGarageFloorDTO) {
    return this.floorService.addGarageFloor(userID, dto);
  }

  @Get('/:id')
  findFloor(@Body() dto: any) {
    return this.floorService.findFloor(dto);
  }

  @Patch('/update')
  updateGarage(
    @GetUser('id') userID: string,
    @Body() dto: UpdateGarageFloorDTO,
  ) {
    return this.floorService.updateGarageFloor(userID, dto);
  }
}
