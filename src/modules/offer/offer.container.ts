import {Container} from 'inversify';
import {IOffer} from './IOffer';
import {types} from '@typegoose/typegoose';
import {OfferEntity, OfferModel} from './offer.entity';
import {ComponentEnum} from '../../types/component.enum.js';
import OfferService from './offer.service';
import {Controller} from '../../controller/controller.abstract';
import OfferController from './offer.controller';

export function createOfferContainer() {
  const offerContainer = new Container();

  offerContainer.bind<IOffer>(ComponentEnum.IOffer).to(OfferService);
  offerContainer.bind<types.ModelType<OfferEntity>>(ComponentEnum.OfferModel).toConstantValue(OfferModel);
  offerContainer.bind<Controller>(ComponentEnum.OfferController).to(OfferController).inSingletonScope();

  return offerContainer;
}
