import { IsEmail, IsString, MinLength, Matches } from 'class-validator';

export class SignupDto {
  @IsEmail()
  email: string;

  @IsString()
  name: string;

  @IsString()
  @MinLength(8)
  @Matches(/(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[\W_]).*/, {
    message: 'Password too weak',
  })
  password: string;
}
