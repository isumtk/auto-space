import { Controller, Post } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  @Post('/signup')
  signup() {}

  @Post('/signin')
  signin() {}
}
