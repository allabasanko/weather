import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UnauthorizedException } from '@nestjs/common';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should throw if no Authorization header is provided', () => {
    expect(() => service.loginUser('')).toThrow(UnauthorizedException);
  });

  it('should throw if Authorization header format is invalid', () => {
    expect(() => service.loginUser('Bearer sometoken')).toThrow(UnauthorizedException);
  });

  it('should throw if credentials are invalid', () => {
    // username:password → wrong:wrong
    const invalidAuth = 'Basic ' + Buffer.from('wrong:wrong').toString('base64');
    expect(() => service.loginUser(invalidAuth)).toThrow(UnauthorizedException);
  });

  it('should return success if credentials are valid', () => {
    // username:password → admin:password
    const validAuth = 'Basic ' + Buffer.from('admin:password').toString('base64');

    const result = service.loginUser(validAuth);

    expect(result).toEqual({
      message: 'Login successful',
      user: { username: 'admin' },
    });
  });
});
