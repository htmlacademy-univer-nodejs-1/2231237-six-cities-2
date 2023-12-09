import {UserTypeEnum} from './user-type.enum';


export type CommentType = {
  text: string;
  publicationDate: Date;
  rating: number;
  author: UserTypeEnum;
}
