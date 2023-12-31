import {Iuser} from './iuser.js';
import {inject, injectable} from 'inversify';
import {ILogger} from '../../loggers/ilogger.js';
import {DocumentType, types} from '@typegoose/typegoose';
import {UserEntity} from './user.entity';
import CreateUser from './create-user.js';
import {ComponentEnum} from '../../types/component.enum';

@injectable()
export default class UserService implements Iuser {

  constructor(
    @inject(ComponentEnum.ILog) private readonly logger: ILogger,
    @inject(ComponentEnum.UserModel) private readonly userModel: types.ModelType<UserEntity>
  ) {
  }

  public async create(dto: CreateUser, salt: string): Promise<DocumentType<UserEntity>> {
    const user = new UserEntity(dto);
    user.setPassword(dto.password, salt);

    const result = await this.userModel.create(dto);
    this.logger.info(`Новый пользователь создан: ${user.email}`);

    return result;
  }

  public async findByEmail(email: string): Promise<DocumentType<UserEntity> | null> {
    return this.userModel.findOne({email});
  }

  public async findOrCreate(dto: CreateUser, salt: string): Promise<DocumentType<UserEntity>> {
    const existedUser = await this.findByEmail(dto.email);

    if (existedUser) {
      return existedUser;
    }

    return this.create(dto, salt);
  }
}
