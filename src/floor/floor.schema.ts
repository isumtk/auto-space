import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type GarageFloorDocument = Floor & Document;

export enum VehicleType {
  SEDAN,
  SUV,
  MOTORBIKE,
  TRUCK,
  HATCHBACK,
}

export interface Parking {
  firstName: string;
  lastName: string;
  vehicleType: VehicleType;
  licencePlate: string;
  startTime: Date;
  endTime: Date;
}

@Schema()
class PartialUser {
  _id: string;
}
const PartialUserSchema = SchemaFactory.createForClass(PartialUser);

@Schema()
export class Floor {
  @Prop({ required: true })
  floor: string;

  @Prop({ type: PartialUserSchema, required: true })
  owner: PartialUser;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const GarageFloorSchema = SchemaFactory.createForClass(Floor);
