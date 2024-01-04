import {Container} from 'inversify';
import Application from './app/application';
import {ComponentEnum} from './types/component.enum';
import {createApplicationContainer} from './app/application.container';
import {createUserContainer} from './modules/user/user.container';
import {createOfferContainer} from './modules/offer/offer.container';
import {createCommentContainer} from './modules/comment/comment.container';

const container = Container.merge(createApplicationContainer(),
  createUserContainer(),
  createOfferContainer(),
  createCommentContainer());

const application = container.get<Application>(ComponentEnum.Application);
await application.init();
