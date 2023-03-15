import { IsNotEmpty, IsString } from 'class-validator';

export class DeleteParkingSpaceDTO {
  @IsNotEmpty()
  @IsString()
  floorID: string;

  @IsNotEmpty()
  @IsString()
  parkingID: string;
}
