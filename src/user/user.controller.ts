import { Controller, Patch, Get, UseGuards, Delete } from '@nestjs/common';
import { JwtGuard } from './../auth/guard';

@UseGuards(JwtGuard)
@Controller('user')
export class UserController {
  @Patch(':id')
  editUser() {}

  @Delete(':id')
  deleteUser() {}
}
