import {inject, injectable} from 'inversify';
import {ILogger} from '../loggers/ilogger';
import {ComponentEnum} from '../types/component.enum';
import {ConfigSchema} from '../config/config.schema';
import {Iconfig} from '../config/iconfig.js';

@injectable()
export default class Application {
  constructor(
    @inject(ComponentEnum.ILog) private readonly logger: ILogger,
    @inject(ComponentEnum.IConfig) private readonly config: Iconfig<ConfigSchema>,
  ) {
  }

  public async init() {
    this.logger.info('Приложение инициализировано');
    this.logger.info(`PORT: ${this.config.get('PORT')}`);
    this.logger.info(`DB_HOST: ${this.config.get('DB_HOST')}`);
    this.logger.info(`SALT: ${this.config.get('SALT')}`);
  }
}
