import {Request, Response} from 'express';
import {inject, injectable} from 'inversify';
import {Controller} from '../../controller/controller.abstract';
import {ILogger} from '../../loggers/iLogger';
import {IComment} from './IComment';
import {IOffer} from '../offer/IOffer';
import {HttpMethod} from '../../types/http-method.enum';
import CreateComment from './create-comment';
import {DocumentExistsMiddleware} from '../../middlewares/document-exists.middleware';
import {ValidateDtoMiddleware} from '../../middlewares/validate.middleware';
import {ComponentEnum} from '../../types/component.enum';
import {fillDto} from '../../helpers/common';
import CommentRdo from './rdo/comment.rdo';

@injectable()
export default class CommentController extends Controller {
  constructor(
    @inject(ComponentEnum.ILogger) protected readonly logger: ILogger,
    @inject(ComponentEnum.IComment) private readonly commentService: IComment,
    @inject(ComponentEnum.IOffer) private readonly offerService: IOffer,
  ) {
    super(logger);

    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Post,
      handler: this.create,
      middlewares: [
        new ValidateDtoMiddleware(CreateComment),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId')
      ]
    });
  }

  public async create({body}: Request<object, object, CreateComment>, res: Response): Promise<void> {
    const comment = await this.commentService.createForOffer(body);
    this.created(res, fillDto(CommentRdo, comment));
  }
}
