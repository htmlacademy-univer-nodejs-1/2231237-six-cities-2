import {DocumentType} from '@typegoose/typegoose';
import CreateOffer from './create-offer.js';
import {OfferEntity} from './offer.entity.js';
import {UpdateOffer} from './update-offer';

export interface Ioffer {
  create(dto: CreateOffer): Promise<DocumentType<OfferEntity>>;

  findById(offerId: string): Promise<DocumentType<OfferEntity> | null>;

  find(count: number): Promise<DocumentType<OfferEntity>[]>;

  deleteById(offerId: string): Promise<DocumentType<OfferEntity> | null>;

  updateById(offerId: string, dto: UpdateOffer): Promise<DocumentType<OfferEntity> | null>;

  findPremiumByCity(city: string): Promise<DocumentType<OfferEntity>[]>;

  incrementComment(offerId: string): Promise<DocumentType<OfferEntity> | null>;

  exists(documentId: string): Promise<boolean>;

  updateRating(offerId: string, rating: number): Promise<void>;
}
