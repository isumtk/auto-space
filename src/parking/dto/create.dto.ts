import { IsNotEmpty, IsPositive, IsString } from 'class-validator';

export class CreateParkingSpaceDTO {
  @IsNotEmpty()
  @IsString()
  floorID: string;

  @IsNotEmpty()
  @IsPositive()
  spaces: number;
}
