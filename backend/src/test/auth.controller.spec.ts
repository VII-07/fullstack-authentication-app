import { AuthService } from './../modules/auth/auth.service';
import { AuthController } from './../modules/auth/auth.controller';
import { Test, TestingModule } from '@nestjs/testing';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            signup: jest.fn(),
            login: jest.fn(),
          },
        },
      ],
    }).compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(authController).toBeDefined();
  });

  describe('signup', () => {
    it('should call authService.signup with correct parameters', async () => {
      const signupDto = {
        email: 'test@example.com',
        name: 'John Doe',
        password: 'StrongP@ssword1',
      };
      jest
        .spyOn(authService, 'signup')
        .mockResolvedValue({ message: 'User registered successfully' });

      const result = await authController.signup(signupDto);

      expect(authService.signup).toHaveBeenCalledWith(signupDto);
      expect(result).toEqual({ message: 'User registered successfully' });
    });
  });

  describe('login', () => {
    it('should call authService.login with correct parameters', async () => {
      const loginDto = {
        email: 'test@example.com',
        password: 'StrongP@ssword1',
      };
      jest
        .spyOn(authService, 'login')
        .mockResolvedValue({ access_token: 'valid-token' });

      const result = await authController.login(loginDto);

      expect(authService.login).toHaveBeenCalledWith(loginDto);
      expect(result).toEqual({ access_token: 'valid-token' });
    });
  });
});
