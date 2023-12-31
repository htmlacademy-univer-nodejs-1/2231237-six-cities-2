import {Container} from 'inversify';
import Application from './app/application';
import {ComponentEnum} from './types/component.enum';
import {ILogger} from './loggers/ilogger';
import {Iconfig} from './config/iconfig';
import {ConfigSchema} from './config/config.schema';
import ConfigService from './config/config.service';
import LoggerService from './loggers/logger';

const container = new Container();
container.bind<Application>(ComponentEnum.Application).to(Application).inSingletonScope();
container.bind<Iconfig<ConfigSchema>>(ComponentEnum.IConfig).to(ConfigService).inSingletonScope();
container.bind<ILogger>(ComponentEnum.ILog).to(LoggerService).inSingletonScope();

const application = container.get<Application>(ComponentEnum.Application);
await application.init();
