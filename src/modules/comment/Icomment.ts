import {DocumentType} from '@typegoose/typegoose';
import {CommentEntity} from './comment.entity';
import CreateComment from './create-comment';

export interface Icomment {
  createForOffer(dto: CreateComment): Promise<DocumentType<CommentEntity>>;

  findByOfferId(offerId: string): Promise<DocumentType<CommentEntity>[]>;

  deleteByOfferId(offerId: string): Promise<number | null>;
}
