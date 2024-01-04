import {Ioffer} from './Ioffer.js';
import {inject, injectable} from 'inversify';
import {ILogger} from '../../loggers/ilogger.js';
import {DocumentType, types} from '@typegoose/typegoose';
import {OfferEntity} from './offer.entity.js';
import CreateOffer from './create-offer.js';
import {ComponentEnum} from '../../types/component.enum';
import {Icomment} from '../comment/Icomment';
import {UpdateOffer} from './update-offer';
import {SortType} from '../../types/sort-type';

const MAX_OFFERS_COUNT = 60;
const MAX_PREMIUM_OFFERS_COUNT = 3;
@injectable()
export default class OfferService implements Ioffer {
  constructor(
    @inject(ComponentEnum.ILog) private readonly logger: ILogger,
    @inject(ComponentEnum.OfferModel) private readonly offerModel: types.ModelType<OfferEntity>,
    @inject(ComponentEnum.IComment) private readonly commentService: Icomment
  ) {
  }

  public async create(dto: CreateOffer): Promise<DocumentType<OfferEntity>> {
    const result = await this.offerModel.create(dto);
    this.logger.info(`Новое предложение создано: ${dto.name}`);

    return result;
  }

  public async findById(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findById(offerId)
      .populate('userId')
      .exec();
  }

  public async deleteById(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    await this.commentService.deleteByOfferId(offerId);
    return this.offerModel
      .findByIdAndDelete(offerId)
      .exec();
  }

  public async find(count: number): Promise<DocumentType<OfferEntity>[]> {
    const limit = count ?? MAX_OFFERS_COUNT;
    return this.offerModel
      .find()
      .sort({createdAt: SortType.Down})
      .populate('userId')
      .limit(limit)
      .exec();
  }

  public async findPremiumByCity(city: string): Promise<DocumentType<OfferEntity>[]> {
    return this.offerModel
      .find({city: city, premium: true})
      .sort({createdAt: SortType.Down})
      .limit(MAX_PREMIUM_OFFERS_COUNT)
      .populate('userId')
      .exec();
  }

  incrementComment(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndUpdate(offerId, {'$inc': {commentsCount: 1,}}).exec();
  }

  public async updateById(offerId: string, dto: UpdateOffer): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndUpdate(offerId, dto, {new: true})
      .populate('userId')
      .exec();
  }

  public async updateRating(offerId: string, rating: number): Promise<void> {
    await this.offerModel
      .findByIdAndUpdate(offerId, {rating: rating}, {new: true})
      .exec();
  }

  public async exists(documentId: string): Promise<boolean> {
    return (await this.offerModel
      .exists({_id: documentId})) !== null;
  }
}
