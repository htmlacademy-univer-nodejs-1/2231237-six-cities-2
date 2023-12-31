import {Ioffer} from './Ioffer.js';
import {inject, injectable} from 'inversify';
import {ILogger} from '../../loggers/ilogger.js';
import {DocumentType, types} from '@typegoose/typegoose';
import {OfferEntity} from './offer.entity.js';
import CreateOffer from './create-offer.js';
import {ComponentEnum} from '../../types/component.enum';

@injectable()
export default class OfferService implements Ioffer {
  constructor(
    @inject(ComponentEnum.ILog) private readonly logger: ILogger,
    @inject(ComponentEnum.OfferModel) private readonly offerModel: types.ModelType<OfferEntity>
  ) {
  }

  public async create(dto: CreateOffer): Promise<DocumentType<OfferEntity>> {
    const result = await this.offerModel.create(dto);
    this.logger.info(`Новое предложение создано: ${dto.name}`);

    return result;
  }

  public async findById(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel.findById(offerId).exec();
  }
}
