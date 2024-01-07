import {Container} from 'inversify';
import Application from './application';
import {ComponentEnum} from '../types/component.enum';
import LoggerService from '../loggers/logger';
import {ConfigSchema} from '../config/config.schema';
import {ILogger} from '../loggers/iLogger';
import {Iconfig} from '../config/iconfig';
import ConfigService from '../config/config.service';
import MongoClientService from '../db-client/mongodb-client';
import {IDbClient} from '../db-client/iDb-client';
import {ExceptionFilter} from '../http-handlers/exception.filter.js';
import AppExceptionFilter from '../http-handlers/app-exception.filter.js';

export function createApplicationContainer() {
  const applicationContainer = new Container();
  applicationContainer.bind<Application>(ComponentEnum.Application).to(Application).inSingletonScope();
  applicationContainer.bind<ILogger>(ComponentEnum.ILogger).to(LoggerService).inSingletonScope();
  applicationContainer.bind<Iconfig<ConfigSchema>>(ComponentEnum.IConfig).to(ConfigService).inSingletonScope();
  applicationContainer.bind<IDbClient>(ComponentEnum.DatabaseClientInterface).to(MongoClientService).inSingletonScope();
  applicationContainer.bind<ExceptionFilter>(ComponentEnum.ExceptionFilter).to(AppExceptionFilter).inSingletonScope();

  return applicationContainer;
}
