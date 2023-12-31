import {Container} from 'inversify';
import {Ioffer} from './Ioffer.js';
import {types} from '@typegoose/typegoose';
import {OfferEntity, OfferModel} from './offer.entity';
import {ComponentEnum} from '../../types/component.enum.js';
import OfferService from './offer.service';

export function createOfferContainer() {
  const offerContainer = new Container();

  offerContainer.bind<Ioffer>(ComponentEnum.IOffer).to(OfferService);
  offerContainer.bind<types.ModelType<OfferEntity>>(ComponentEnum.OfferModel).toConstantValue(OfferModel);

  return offerContainer;
}
