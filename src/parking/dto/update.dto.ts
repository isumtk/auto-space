import { IsDate, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateParkingSpaceDTO {
  @IsNotEmpty()
  @IsString()
  floorID: string;

  @IsNotEmpty()
  @IsString()
  parkingID: string;

  @IsString()
  @IsOptional()
  firstName?: string;

  @IsString()
  @IsOptional()
  lastName?: string;

  @IsString()
  @IsOptional()
  license?: string;

  @IsString()
  @IsOptional()
  type?: string;

  @IsDate()
  @IsOptional()
  startTime?: Date;

  @IsDate()
  @IsOptional()
  endTime?: Date;
}
