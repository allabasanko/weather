import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UnauthorizedException } from '@nestjs/common';

describe('AuthController', () => {
  let controller: AuthController;
  let service: AuthService;

  const mockAuthService = {
    loginUser: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call AuthService.loginUser with authHeader', () => {
    const header = 'Basic ' + Buffer.from('admin:password').toString('base64');
    const mockResult = { message: 'Login successful', user: { username: 'admin' } };

    const spy = jest.spyOn(service, 'loginUser').mockReturnValue(mockResult);

    const result = controller.login(header);

    expect(spy).toHaveBeenCalledWith(header);
    expect(result).toEqual(mockResult);
  });

  it('should throw UnauthorizedException if service throws', () => {
    const header = 'Basic invalid';
    jest.spyOn(service, 'loginUser').mockImplementation(() => {
      throw new UnauthorizedException();
    });

    expect(() => controller.login(header)).toThrow(UnauthorizedException);
  });
});
