import {Controller} from '../../controller/controller.abstract';
import {inject, injectable} from 'inversify';
import {ComponentEnum} from '../../types/component.enum';
import {ILogger} from '../../loggers/iLogger';
import {ConfigSchema} from '../../config/config.schema';
import {Iconfig} from '../../config/iconfig';
import {HttpMethod} from '../../types/http-method.enum';
import {HttpError} from '../../http-handlers/http.errors';
import {StatusCodes} from 'http-status-codes';
import {Request, Response} from 'express';
import CreateUser from './create-user';
import {IUser} from './iUser';
import {ValidateDtoMiddleware} from '../../middlewares/validate.middleware';
import LoginUser from './login-user';
import {CreateUserRequest} from '../../types/create-user-req';
import UserRdo from './rdo/user.rdo';
import {fillDto} from '../../helpers/common';
import {LoginUserRequest} from '../../types/login-user-req';
import {ValidateObjectIdMiddleware} from '../../middlewares/validate-objectid.middleware';
import {UploadMiddleware} from '../../middlewares/upload.middleware';

@injectable()
export default class UserController extends Controller {
  constructor(@inject(ComponentEnum.ILogger) logger: ILogger,
    @inject(ComponentEnum.IUser) private readonly userService: IUser,
    @inject(ComponentEnum.IConfig) private readonly configService: Iconfig<ConfigSchema>
  ) {
    super(logger);

    this.logger.info('Register routes for CategoryController…');

    this.addRoute({
      path: '/register',
      method: HttpMethod.Post,
      handler: this.create,
      middlewares: [
        new ValidateDtoMiddleware(CreateUser)
      ]
    });
    this.addRoute({
      path: '/login',
      method: HttpMethod.Post,
      handler: this.login,
      middlewares: [
        new ValidateDtoMiddleware(LoginUser)
      ]
    });
    this.addRoute({
      path: '/logout',
      method: HttpMethod.Post,
      handler: this.logout
    });
    this.addRoute({
      path: '/:userId/avatar',
      method: HttpMethod.Post,
      handler: this.uploadUserAvatar,
      middlewares: [
        new ValidateObjectIdMiddleware('userId'),
        new UploadMiddleware(this.configService.get('UPLOAD_DIR'), 'avatar'),
      ]
    });
  }

  public async create({body}: CreateUserRequest, res: Response,): Promise<void> {
    const existsUser = await this.userService.findByEmail(body.email);

    if (existsUser) {
      throw new HttpError(
        StatusCodes.CONFLICT,
        `User with email ${body.email} already exists.`,
        'UserController'
      );
    }

    const result = await this.userService.create(body, this.configService.get('SALT'));
    this.created(
      res,
      fillDto(UserRdo, result)
    );
  }

  public async login({body}: LoginUserRequest, _res: Response,): Promise<void> {
    const existsUser = await this.userService.findByEmail(body.email);

    if (!existsUser) {
      throw new HttpError(
        StatusCodes.UNAUTHORIZED,
        `User with email ${body.email} not found.`,
        'UserController',
      );
    }
    throw new HttpError(
      StatusCodes.NOT_IMPLEMENTED,
      'Not implemented',
      'UserController',
    );
  }

  public async logout(_req: Request, _res: Response): Promise<void> {
    throw new HttpError(
      StatusCodes.NOT_IMPLEMENTED,
      'Not implemented',
      'UserController',
    );
  }

  public async uploadUserAvatar(req: Request, res: Response) {
    this.created(res, {
      filepath: req.file?.path
    });
  }
}
