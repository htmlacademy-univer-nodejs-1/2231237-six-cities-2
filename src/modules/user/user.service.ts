import {IUser} from './iUser';
import {inject, injectable} from 'inversify';
import {ILogger} from '../../loggers/iLogger';
import {DocumentType, types} from '@typegoose/typegoose';
import {UserEntity} from './user.entity';
import CreateUser from './create-user.js';
import {ComponentEnum} from '../../types/component.enum';
import {OfferEntity} from '../offer/offer.entity';

@injectable()
export default class UserService implements IUser {

  constructor(
    @inject(ComponentEnum.ILogger) private readonly logger: ILogger,
    @inject(ComponentEnum.UserModel) private readonly userModel: types.ModelType<UserEntity>
  ) {
  }

  public async create(dto: CreateUser, salt: string): Promise<DocumentType<UserEntity>> {
    const user = new UserEntity({...dto, avatar: ''});
    user.setPassword(dto.password, salt);

    const result = await this.userModel.create(dto);
    this.logger.info(`Новый пользователь создан: ${user.email}`);

    return result;
  }

  public async findByEmail(email: string): Promise<DocumentType<UserEntity> | null> {
    return this.userModel.findOne({email});
  }

  public async findFavorites(userId: string): Promise<DocumentType<OfferEntity>[]> {
    const offers = await this.userModel.findById(userId).select('favorite');
    if (!offers) {
      return [];
    }

    return this.userModel
      .find({_id: { $in: offers.favorite }});
  }

  public async findOrCreate(dto: CreateUser, salt: string): Promise<DocumentType<UserEntity>> {
    const existedUser = await this.findByEmail(dto.email);

    if (existedUser) {
      return existedUser;
    }

    return this.create(dto, salt);
  }

  public async findById(userId: string): Promise<DocumentType<UserEntity> | null> {
    return this.userModel.findOne({'_id': userId});
  }

  public addToFavoritesById(userId: string, offerId: string): Promise<DocumentType<OfferEntity>[] | null> {
    return this.userModel.findByIdAndUpdate(userId, {$push: {favorite: offerId}, new: true});
  }

  public removeFromFavoritesById(userId: string, offerId: string): Promise<DocumentType<OfferEntity>[] | null> {
    return this.userModel.findByIdAndUpdate(userId, {$pull: {favorite: offerId}, new: true});
  }
}
