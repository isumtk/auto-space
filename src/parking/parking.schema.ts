import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export enum VehicleType {
  EMPTY = null,
  SEDAN = 'sedan',
  SUV = 'suv',
  MOTORBIKE = 'motorbike',
  TRUCK = 'truck',
  HATCHBACK = 'hatchback',
}

@Schema()
class PartialFloor {}
const PartialFloorSchema = SchemaFactory.createForClass(PartialFloor);

@Schema()
export class ParkingSpace {
  @Prop({ default: null })
  firstName: string;

  @Prop({ default: null })
  lastName: string;

  @Prop({ default: null })
  startTime: Date;

  @Prop({ default: null })
  endTime: Date;

  @Prop({ default: VehicleType.EMPTY, enum: Object.values(VehicleType) })
  type: string;

  @Prop({ default: null })
  model: string;

  @Prop({ default: null, length: 10 })
  licence: string;

  @Prop({ type: PartialFloorSchema, required: true })
  floor: PartialFloor;
}

export const ParkingSpaceSchema = SchemaFactory.createForClass(ParkingSpace);
