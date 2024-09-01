import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { CustomLoggerService } from 'src/logging/custom-logger.service';
import { LoginDto } from './dto/login.dto';
import { SignupDto } from './dto/signup.dto';
import { User } from './entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private readonly jwtService: JwtService,
    private readonly customLogger: CustomLoggerService,
  ) {}

  async signup(signupDto: SignupDto): Promise<{ message: string }> {
    const { email, password } = signupDto;

    this.customLogger.info(
      `Starting signup process for email: ${email}`,
      'AuthService',
    );

    const user = await this.userModel.findOne({ email });
    if (user) {
      this.customLogger.warn(
        `Signup failed: User already exists for email: ${email}`,
        'AuthService',
      );
      throw new BadRequestException('User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    this.customLogger.debug(
      `Password hashed successfully for email: ${email}`,
      'AuthService',
    );

    const newUser = new this.userModel({
      ...signupDto,
      password: hashedPassword,
    });

    await newUser.save();
    this.customLogger.info(
      `User registered successfully with email: ${email}`,
      'AuthService',
    );

    return { message: 'User registered successfully' };
  }

  async login(loginDto: LoginDto): Promise<{ access_token: string }> {
    const { email, password } = loginDto;

    this.customLogger.info(`Login attempt for email: ${email}`, 'AuthService');

    const user = await this.userModel.findOne({ email });
    if (!user) {
      this.customLogger.warn(
        `Login failed: No user found with email: ${email}`,
        'AuthService',
      );
      throw new BadRequestException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      this.customLogger.warn(
        `Login failed: Invalid password for email: ${email}`,
        'AuthService',
      );
      throw new BadRequestException('Invalid credentials');
    }

    const payload = { sub: user._id, email: user.email };
    const accessToken = this.jwtService.sign(payload);
    this.customLogger.info(
      `Login successful for email: ${email}. JWT generated.`,
      'AuthService',
    );

    return { access_token: accessToken };
  }
}
