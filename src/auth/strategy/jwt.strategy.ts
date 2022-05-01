
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt',) {
  constructor(config: ConfigService, private prisma: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  //    ignoreExpiration: false,
      secretOrKey: config.get('JWT_SECRET'),
    });
    // private è solo per prisma perchè usato anche nel metodo validate in modo da creare la dichiarazione private prisma : PrismaService
  }

  async validate(payload: {
    sub: number,
    email: string
  }) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: payload.sub
      }
    });
    // return { userId: payload.sub, username: payload.email };
    delete user.hash;
    return user;
  }
}
