import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CreateParkingSpaceDTO } from './dto';
import { JwtGuard } from './../auth/guard';
import { ParkingSpaceService } from './parking.service';

@UseGuards(JwtGuard)
@Controller('parking')
export class ParkingSpaceController {
  constructor(private readonly parkingService: ParkingSpaceService) {}
  @Post('/create')
  generateParkingSpace(@Body() dto: CreateParkingSpaceDTO) {
    return this.parkingService.generateParkingSpace(dto);
  }
}
