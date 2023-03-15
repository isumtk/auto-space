import {
  Body,
  Controller,
  Delete,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  CreateParkingSpaceDTO,
  DeleteParkingSpaceDTO,
  UpdateParkingSpaceDTO,
} from './dto';
import { JwtGuard } from './../auth/guard';
import { ParkingSpaceService } from './parking.service';
import { GetUser } from 'src/auth/decorator';

@UseGuards(JwtGuard)
@Controller('parking')
export class ParkingSpaceController {
  constructor(private readonly parkingService: ParkingSpaceService) {}
  @Post('/create')
  generateParkingSpace(@Body() dto: CreateParkingSpaceDTO) {
    return this.parkingService.generateParkingSpace(dto);
  }

  @Patch('/update')
  modifyParkingSpace(
    @GetUser('id') userID: string,
    @Body() dto: UpdateParkingSpaceDTO,
  ) {
    console.log({ userID });
    console.log({ dto });
    return this.parkingService.modifyParkingSpace(userID, dto);
  }

  @Delete('/delete')
  DeleteParkingSpaceDTO(
    @GetUser('id') userID: string,
    @Body() dto: DeleteParkingSpaceDTO,
  ) {
    return this.parkingService.deleteParkingSpace(userID, dto);
  }
}
