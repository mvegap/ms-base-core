import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private readonly logger: Logger,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userService.findByUsername(username);

    if (this.isPasswordValid(pass, user.password)) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    }

    return null;
  }

  async login(user: any): Promise<any> {
    const payload = {
      sub: user.id,
      username: user.username,
      role: user.role.name,
    };

    this.logger.log(
      `Login success: ${JSON.stringify(payload)}`,
      'AuthService.login',
    );

    const access_token = await this.jwtService.signAsync(payload);

    await this.userService.storeToken(user.id, access_token);

    return {
      access_token,
      user: {
        username: user.username,
        role: user.role.name,
      },
    };
  }

  private isPasswordValid(password: string, userPassword: string): boolean {
    return bcrypt.compareSync(password, userPassword);
  }

  encodePassword(password: string): string {
    const salt: string = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
  }

  validateToken(token: string): boolean {
    return this.jwtService.verify(token) ? true : false;
  }

  decodeToken(token: string): any {
    return this.jwtService.decode(token);
  }
}
