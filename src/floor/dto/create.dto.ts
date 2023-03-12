import { IsArray, IsNotEmpty, IsPositive, IsString } from 'class-validator';
import { Parking } from '../floor.schema';

export class CreateGarageFloorDTO {
  @IsString()
  @IsNotEmpty()
  floor: string;

  @IsPositive()
  @IsNotEmpty()
  space: number;

  @IsArray()
  @IsNotEmpty()
  garage: Parking[];
}
