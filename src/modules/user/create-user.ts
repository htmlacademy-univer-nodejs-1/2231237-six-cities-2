import {UserTypeEnum} from '../../types/user-type.enum';

export default class CreateUser {
  public email!: string;
  public avatar?: string;
  public username!: string;
  public type!: UserTypeEnum;
  public password!: string;
}
