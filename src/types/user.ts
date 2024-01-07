import {UserTypeEnum} from './user.type.enum';

export type User = {
  username: string;
  email: string;
  avatar?: string;
  type : UserTypeEnum;
}
