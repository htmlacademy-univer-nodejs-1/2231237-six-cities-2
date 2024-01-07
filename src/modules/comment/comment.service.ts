import {DocumentType, types} from '@typegoose/typegoose';
import {inject, injectable} from 'inversify';
import {CommentEntity} from './comment.entity';
import {IOffer} from '../offer/IOffer';
import {IComment} from './IComment';
import {ComponentEnum} from '../../types/component.enum';
import CreateComment from './create-comment';
import {SortType} from '../../types/sort.type';

const COMMENTS_COUNT = 50;
@injectable()
export default class CommentService implements IComment {
  constructor(
    @inject(ComponentEnum.CommentModel) private readonly commentModel: types.ModelType<CommentEntity>,
    @inject(ComponentEnum.OfferModel) private readonly offerService: IOffer
  ) {
  }

  public async createForOffer(dto: CreateComment): Promise<DocumentType<CommentEntity>> {
    const comment = await this.commentModel.create(dto);
    const offerId = dto.offerId;
    await this.offerService.incrementComment(offerId);

    const allRating = this.commentModel.find({offerId}).select('rating');
    const offer = await this.offerService.findById(offerId);

    const count = offer?.commentsCount ?? 1;
    const newRating = allRating['rating'] / (count);
    await this.offerService.updateRating(offerId, newRating);
    return comment.populate('authorId');
  }

  public async findByOfferId(offerId: string): Promise<DocumentType<CommentEntity>[]> {
    return this.commentModel
      .find({offerId})
      .sort({createdAt: SortType.Down})
      .populate('authorId')
      .limit(COMMENTS_COUNT);
  }

  public async deleteByOfferId(offerId: string): Promise<number> {
    const result = await this.commentModel
      .deleteMany({offerId})
      .exec();

    return result.deletedCount;
  }
}
