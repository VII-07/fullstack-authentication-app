import { JwtService } from '@nestjs/jwt';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import * as bcrypt from 'bcrypt';
import { AuthService } from './../modules/auth/auth.service';
import { User } from './../modules/auth/entities/user.entity';

describe('AuthService', () => {
  let authService: AuthService;
  let jwtService: JwtService;
  let userModel: any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: getModelToken(User.name),
          useValue: jest.fn(),
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(),
          },
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    jwtService = module.get<JwtService>(JwtService);
    userModel = module.get(getModelToken(User.name));
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  describe('signup', () => {
    it('should throw an error if user already exists', async () => {
      userModel.findOne = jest
        .fn()
        .mockResolvedValue({ email: 'test@example.com' });

      await expect(
        authService.signup({
          email: 'test@example.com',
          name: 'John Doe',
          password: 'StrongP@ssword1',
        }),
      ).rejects.toThrow('User already exists');
    });

    it('should create a new user if email does not exist', async () => {
      userModel.findOne = jest.fn().mockResolvedValue(null);

      const userInstanceMock = {
        save: jest.fn().mockResolvedValue({
          email: 'test@example.com',
          name: 'John Doe',
          password: 'hashedpassword',
        }),
      };

      // Mock the constructor behavior
      userModel.mockImplementation(() => userInstanceMock);

      const result = await authService.signup({
        email: 'test@example.com',
        name: 'John Doe',
        password: 'StrongP@ssword1',
      });

      expect(result).toEqual({ message: 'User registered successfully' });
    });
  });

  describe('login', () => {
    it('should throw an error if user does not exist', async () => {
      userModel.findOne = jest.fn().mockResolvedValue(null);

      await expect(
        authService.login({
          email: 'test@example.com',
          password: 'StrongP@ssword1',
        }),
      ).rejects.toThrow('Invalid credentials');
    });

    it('should return a JWT token if credentials are valid', async () => {
      const password = 'StrongP@ssword1';
      const hashedPassword = await bcrypt.hash(password, 10);

      userModel.findOne = jest.fn().mockResolvedValue({
        _id: 'userId',
        email: 'test@example.com',
        password: hashedPassword,
      });

      jest.spyOn(bcrypt, 'compare').mockResolvedValue(true as never);

      (jwtService.sign as jest.Mock).mockReturnValue('valid-token');

      const result = await authService.login({
        email: 'test@example.com',
        password: 'StrongP@ssword1',
      });

      expect(result).toEqual({ access_token: 'valid-token' });
    });
  });
});
