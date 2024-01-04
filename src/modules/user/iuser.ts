import {DocumentType} from '@typegoose/typegoose';
import CreateUser from './create-user.js';
import {UserEntity} from './user.entity';
import {OfferEntity} from '../offer/offer.entity';

export interface Iuser {
  create(dto: CreateUser, salt: string): Promise<DocumentType<UserEntity>>;

  findByEmail(email: string): Promise<DocumentType<UserEntity> | null>;

  findOrCreate(dto: CreateUser, salt: string): Promise<DocumentType<UserEntity>>;

  findById(userId: string): Promise<DocumentType<UserEntity> | null>;

  findFavorites(userId: string): Promise<DocumentType<OfferEntity>[]>;

  addToFavoritesById(userId: string, offerId: string): Promise<DocumentType<OfferEntity>[] | null>;

  removeFromFavoritesById(userId: string, offerId: string): Promise<DocumentType<OfferEntity>[] | null>;
}
