import {Container} from 'inversify';
import {types} from '@typegoose/typegoose';
import {CommentEntity, CommentModel} from './comment.entity';
import CommentService from './comment.service';
import {ComponentEnum} from '../../types/component.enum';
import {IComment} from './IComment';
import {IController} from '../../controller/IController';
import CommentController from './comment.controller';

export function createCommentContainer() {
  const commentContainer = new Container();
  commentContainer.bind<IComment>(ComponentEnum.IComment).to(CommentService).inSingletonScope();
  commentContainer.bind<types.ModelType<CommentEntity>>(ComponentEnum.CommentModel).toConstantValue(CommentModel);
  commentContainer.bind<IController>(ComponentEnum.CommentController)
    .to(CommentController).inSingletonScope();
  return commentContainer;
}
