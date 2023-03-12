import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';
import { Parking } from '../floor.schema';

export class UpdateGarageFloorDTO {
  @IsString()
  @IsNotEmpty()
  floorID: string;

  @IsPositive()
  @IsOptional()
  space?: number;

  @IsString()
  @IsOptional()
  floor?: string;

  @IsArray()
  @IsOptional()
  garage?: Parking[];
}
