import {UserTypeEnum} from './user-type.enum';

export type User = {
  username: string;
  email: string;
  avatar?: string;
  password: string;
  type : UserTypeEnum;
}
