import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { AuthController } from './auth/auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { AppConfigModule } from './config/config.module';
import { GarageFloorController } from './floor/floor.controller';
import { GarageFloorModule } from './floor/floor.module';
import { ParkingModule } from './parking/parking.module';

@Module({
  imports: [
    ParkingModule,
    GarageFloorModule,
    UserModule,
    AuthModule,
    AppConfigModule,
    MongooseModule.forRoot(process.env.MONGODB_URI),
  ],
  controllers: [AppController, AuthController, GarageFloorController],
  providers: [AppService],
})
export class AppModule {}
