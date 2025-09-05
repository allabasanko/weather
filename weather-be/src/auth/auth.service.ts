import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor() {}

  loginUser(authHeader: string) {
    if (!authHeader) {
      console.log('Missing Authorization header');
      throw new UnauthorizedException('Missing Authorization header');
    }

    const [type, credentials] = authHeader.split(' ');
    if (type !== 'Basic' || !credentials) {
      console.log('Invalid Authorization format');
      throw new UnauthorizedException('Invalid Authorization format');
    }

    const decoded = Buffer.from(credentials, 'base64').toString('utf-8');
    const [username, password] = decoded.split(':');

    if (username === process.env.BASIC_AUTH_USER && password === process.env.BASIC_AUTH_PASS) {
      console.log('Login successful');
      return { message: 'Login successful', token: credentials };
    }

    throw new UnauthorizedException('Invalid credentials');
  }
}
