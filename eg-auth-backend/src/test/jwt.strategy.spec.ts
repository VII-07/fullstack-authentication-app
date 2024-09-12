import { JwtStrategy } from './../modules/auth/strategies/jwt.strategy';
import { Test, TestingModule } from '@nestjs/testing';

describe('JwtStrategy', () => {
  let jwtStrategy: JwtStrategy;

  beforeEach(async () => {
    process.env.JWT_SECRET = 'test-secret';

    const module: TestingModule = await Test.createTestingModule({
      providers: [JwtStrategy],
    }).compile();

    jwtStrategy = module.get<JwtStrategy>(JwtStrategy);
  });

  it('should validate and return user data', async () => {
    const payload = { sub: 'userId', email: 'test@example.com' };
    const result = await jwtStrategy.validate(payload);

    expect(result).toEqual({ userId: payload.sub, email: payload.email });
  });
});
