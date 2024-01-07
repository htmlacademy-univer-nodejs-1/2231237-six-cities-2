import {IsEmail, IsString} from 'class-validator';

export default class LoginUser {
  @IsEmail({}, {message: 'Email must be valid.'})
  public email!: string;

  @IsString({message: 'Password is required.'})
  public password!: string;
}
