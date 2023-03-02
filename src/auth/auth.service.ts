import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import * as argon from 'argon2';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

import { SignInDTO, SignUpDTO } from './dto';
import { User } from './../user/user.schema';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<User>,
    private readonly jwt: JwtService,
    private readonly config: ConfigService,
  ) {}
  async signup(dto: SignUpDTO) {
    const password = await argon.hash(dto.password);
    try {
      const user = await this.userModel.create({ ...dto, password });
      return this.generateToken(user.id, user.email);
    } catch (error: any) {
      if (error.code === 11000) {
        throw new ConflictException('User already exists');
      }
    }
  }
  async signin(dto: SignInDTO) {
    const userExists = await this.userModel
      .findOne({ email: dto.email })
      .exec();
    if (!userExists) {
      throw new NotFoundException('User not found');
    }

    const userVerify = await argon.verify(userExists.password, dto.password);
    if (!userVerify) {
      throw new UnauthorizedException('Check credentials');
    }

    return this.generateToken(userExists.id, userExists.email);
  }

  async generateToken(
    userID: string,
    email: string,
  ): Promise<{ access_token: string }> {
    const payload = {
      sub: userID,
      email,
    };
    const secret = this.config.get('JWT_SECRET');
    const token = await this.jwt.signAsync(payload, {
      expiresIn: '7d',
      secret,
    });
    return { access_token: token };
  }
}
