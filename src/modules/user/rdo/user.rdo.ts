import {Expose} from 'class-transformer';
import {UserTypeEnum} from '../../../types/user.type.enum';

export default class UserRdo {
  @Expose()
  public username!: string;

  @Expose()
  public email!: string;

  @Expose()
  public avatar!: string;

  @Expose()
  public type!: UserTypeEnum;
}
