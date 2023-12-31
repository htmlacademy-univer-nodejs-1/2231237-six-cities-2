import {DocumentType} from '@typegoose/typegoose';
import CreateOffer from './create-offer.js';
import {OfferEntity} from './offer.entity.js';

export interface Ioffer {
  create(dto: CreateOffer): Promise<DocumentType<OfferEntity>>;
  findById(offerId: string): Promise<DocumentType<OfferEntity> | null>;
}
