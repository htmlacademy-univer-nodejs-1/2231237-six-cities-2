import {DocumentType} from '@typegoose/typegoose';
import CreateUser from './create-user.js';
import {UserEntity} from './user.entity';

export interface Iuser {
  create(dto: CreateUser, salt: string): Promise<DocumentType<UserEntity>>;

  findByEmail(email: string): Promise<DocumentType<UserEntity> | null>;

  findOrCreate(dto: CreateUser, salt: string): Promise<DocumentType<UserEntity>>;
}
