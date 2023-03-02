import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDTO, SignUpDTO } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private service: AuthService) {}
  @Post('/signup')
  signup(@Body() dto: SignUpDTO) {
    return this.service.signup(dto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('/signin')
  signin(@Body() dto: SignInDTO) {
    return this.service.signin(dto);
  }
}
