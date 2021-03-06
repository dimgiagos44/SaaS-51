import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userService.findOneByUsername(username);
    const isMatch = await bcrypt.compare(pass, user.password);
    if (user && isMatch === true) {
      const { password, ...result } = user;
      return result;
    }
    return {'auth': 'fail'};
  }

  async login(user: any) {
    if (user.auth == 'fail'){
      return { 'auth': 'fail' };
    }
    else {
      const payload = { username: user.username, email: user.email, id: user.id };
      return {
        token: this.jwtService.sign(payload),
        userId: user.id
      };
    }
  }
}
