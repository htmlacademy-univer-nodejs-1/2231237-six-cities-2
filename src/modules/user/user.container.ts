import {Container} from 'inversify';
import {ComponentEnum} from '../../types/component.enum';
import {types} from '@typegoose/typegoose';
import {UserEntity, UserModel} from './user.entity.js';
import UserService from './user.service';
import {Iuser} from './iuser';

export function createUserContainer() {
  const userContainer = new Container();
  userContainer.bind<Iuser>(ComponentEnum.IUser).to(UserService).inSingletonScope();
  userContainer.bind<types.ModelType<UserEntity>>(ComponentEnum.UserModel).toConstantValue(UserModel);

  return userContainer;
}
