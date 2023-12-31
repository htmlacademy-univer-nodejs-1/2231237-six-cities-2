import {Container} from 'inversify';
import Application from './application';
import {ComponentEnum} from '../types/component.enum';
import LoggerService from '../loggers/logger';
import {ConfigSchema} from '../config/config.schema';
import {ILogger} from '../loggers/ilogger';
import {Iconfig} from '../config/iconfig';
import ConfigService from '../config/config.service';
import MongoClientService from '../db-client/mongodb-client';
import {IDbClient} from '../db-client/idb-client';

export function createApplicationContainer() {
  const applicationContainer = new Container();
  applicationContainer.bind<Application>(ComponentEnum.Application).to(Application).inSingletonScope();
  applicationContainer.bind<ILogger>(ComponentEnum.ILog).to(LoggerService).inSingletonScope();
  applicationContainer.bind<Iconfig<ConfigSchema>>(ComponentEnum.IConfig).to(ConfigService).inSingletonScope();
  applicationContainer.bind<IDbClient>(ComponentEnum.DatabaseClientInterface).to(MongoClientService).inSingletonScope();

  return applicationContainer;
}
