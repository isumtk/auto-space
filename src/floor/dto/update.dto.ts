import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateGarageFloorDTO {
  @IsString()
  @IsNotEmpty()
  floorID: string;

  @IsString()
  @IsOptional()
  floor?: string;
}
