import {Container} from 'inversify';
import {types} from '@typegoose/typegoose';
import {CommentEntity, CommentModel} from './comment.entity';
import CommentService from './comment.service';
import {ComponentEnum} from '../../types/component.enum';
import {Icomment} from './Icomment';

export function createCommentContainer() {
  const commentContainer = new Container();
  commentContainer.bind<Icomment>(ComponentEnum.IComment).to(CommentService).inSingletonScope();
  commentContainer.bind<types.ModelType<CommentEntity>>(ComponentEnum.CommentModel).toConstantValue(CommentModel);

  return commentContainer;
}
