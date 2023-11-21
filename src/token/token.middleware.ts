import { Injectable, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TokenMiddleware implements NestMiddleware {

  constructor(private readonly jwtService: JwtService) {}

  use(req: any, res: any, next: () => void) {
    next();
  }
}
