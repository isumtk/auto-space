import { IsNotEmpty, IsString } from 'class-validator';

export class CreateGarageFloorDTO {
  @IsString()
  @IsNotEmpty()
  floor: string;
}
