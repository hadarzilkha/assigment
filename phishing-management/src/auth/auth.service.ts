import { Injectable, UnauthorizedException} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
      ) {}

      async register(email: string, password: string) {
        const hashed = await bcrypt.hash(password, 10);
        return this.usersService.create(email, hashed);
      }
    
      async login(email: string, password: string) {
        const user = await this.usersService.findByEmail(email);
        if (!user || !(await bcrypt.compare(password, user.password))) {
          throw new UnauthorizedException('Invalid credentials');
        }
        const payload = { sub: user._id, email: user.email };
        return {
          access_token: this.jwtService.sign(payload),
        };
      }
}
