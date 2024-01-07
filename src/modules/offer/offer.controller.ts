import {inject, injectable} from 'inversify';
import {Controller} from '../../controller/controller.abstract';
import {ILogger} from '../../loggers/iLogger';
import {ComponentEnum} from '../../types/component.enum';
import {IOffer} from './IOffer';
import {HttpMethod} from '../../types/http-method.enum';
import {Request, Response} from 'express';
import {fillDto} from '../../helpers/common';
import CreateOffer from './create-offer';
import {OfferRdo} from './rdo/offer.rdo';
import {UpdateOffer} from './update-offer';
import {IUser} from '../user/iUser';
import {IComment} from '../comment/IComment';
import {ValidateDtoMiddleware} from '../../middlewares/validate.middleware';
import {ValidateObjectIdMiddleware} from '../../middlewares/validate-objectid.middleware';
import {DocumentExistsMiddleware} from '../../middlewares/document-exists.middleware';
import {ParamsCity, ParamsOffer, ParamsOffersCount} from '../../types/params.type';
import {CreateOfferRequest} from '../../types/create-offer-req';
import {ShortFavoriteOfferDto} from './rdo/short-favorite-offer.dto';

@injectable()
export default class OfferController extends Controller {
  constructor(@inject(ComponentEnum.ILogger) logger: ILogger,
    @inject(ComponentEnum.IOffer) private readonly offerService: IOffer,
    @inject(ComponentEnum.IUser) private readonly userService: IUser,
    @inject(ComponentEnum.IComment) private readonly commentService: IComment
  ) {
    super(logger);

    this.logger.info('Register routes for OfferController…');

    this.addRoute({
      path: '/',
      method: HttpMethod.Get,
      handler: this.index
    });

    this.addRoute({
      path: '/',
      method: HttpMethod.Post,
      handler: this.create,
      middlewares: [
        new ValidateDtoMiddleware(CreateOffer)
      ]
    });

    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Get,
      handler: this.show,
      middlewares: [
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId')
      ]
    });

    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Patch,
      handler: this.update,
      middlewares: [
        new ValidateObjectIdMiddleware('offerId'),
        new ValidateDtoMiddleware(UpdateOffer),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId')
      ]
    });

    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Delete,
      handler: this.delete,
      middlewares: [
        new ValidateObjectIdMiddleware('offerId')
      ]
    });

    this.addRoute({
      path: '/premium/:city',
      method: HttpMethod.Get,
      handler: this.showPremium
    });

    this.addRoute({
      path: '/favorites/:offerId',
      method: HttpMethod.Post,
      handler: this.addFavorite,
      middlewares: [
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId')
      ]
    });

    this.addRoute({
      path: '/favorites/:offerId',
      method: HttpMethod.Delete,
      handler: this.deleteFavorite,
      middlewares: [
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId')
      ]
    });

    this.addRoute({
      path: '/favorites',
      method: HttpMethod.Get,
      handler: this.showFavorites
    });
  }

  public async index({params}: Request<ParamsOffersCount>, res: Response): Promise<void> {
    const offerCount = params.count ? parseInt(`${params.count}`, 10) : undefined;
    const offers = await this.offerService.find(offerCount);
    this.ok(res, fillDto(OfferRdo, offers));
  }

  public async create({body}: CreateOfferRequest, res: Response): Promise<void> {
    const result = await this.offerService.create(body);
    this.created(res, result);
  }

  public async show({params}: Request<ParamsOffer>, res: Response): Promise<void> {
    const offer = await this.offerService.findById(params.offerId);
    this.ok(res, fillDto(OfferRdo, offer));
  }

  public async update({params, body}: Request<ParamsOffer, unknown, UpdateOffer>, res: Response): Promise<void> {
    const updatedOffer = await this.offerService.updateById(params.offerId, body);
    this.ok(res, updatedOffer);
  }

  public async delete({params}: Request<ParamsOffer>, res: Response): Promise<void> {
    await this.offerService.deleteById(params.offerId);
    await this.commentService.deleteByOfferId(params.offerId);
    this.noContent(res, `Предложение ${params.offerId} было удалено.`);
  }

  public async showPremium({params}: Request<ParamsCity>, res: Response): Promise<void> {
    const offers = await this.offerService.findPremiumByCity(params.city);
    this.ok(res, fillDto(OfferRdo, offers));
  }

  public async showFavorites({body}: Request<Record<string, unknown>, Record<string, unknown>, {
    userId: string
  }>, _res: Response): Promise<void> {
    const offers = await this.userService.findFavorites(body.userId);
    this.ok(_res, fillDto(ShortFavoriteOfferDto, offers));
  }

  public async addFavorite({body}: Request<Record<string, unknown>, Record<string, unknown>, {
    offerId: string,
    userId: string
  }>, res: Response): Promise<void> {
    await this.userService.addToFavoritesById(body.offerId, body.userId);
    this.noContent(res, {message: 'Offer was added to favorite'});
  }

  public async deleteFavorite({body}: Request<Record<string, unknown>, Record<string, unknown>, {
    offerId: string,
    userId: string
  }>, res: Response): Promise<void> {
    await this.userService.removeFromFavoritesById(body.offerId, body.userId);
    this.noContent(res, {message: 'Offer was removed from favorite'});
  }
}
