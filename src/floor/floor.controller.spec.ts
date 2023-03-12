import { Test, TestingModule } from '@nestjs/testing';
import { GarageFloorController } from './floor.controller';

describe('GarageController', () => {
  let controller: GarageFloorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GarageFloorController],
    }).compile();

    controller = module.get<GarageFloorController>(GarageFloorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
