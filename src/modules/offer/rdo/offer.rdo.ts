import {CityEnum} from '../../../types/city.enum';
import {HousingTypeEnum} from '../../../types/housing.type.enum';
import {Expose, Type} from 'class-transformer';
import {AmenitiesEnum} from '../../../types/amenities.enum';
import UserRdo from '../../user/rdo/user.rdo';
import {UserTypeEnum} from '../../../types/user.type.enum';
import {CoordinatesType} from '../../../types/coords';

export class OfferRdo {
  @Expose()
  public id!: string;

  @Expose()
    name!: string;

  @Expose()
    publicationDate!: Date;

  @Expose()
    description!: string;

  @Expose()
    city!: CityEnum;

  @Expose()
    previewImage!: string;

  @Expose()
    images!: string[];

  @Expose()
    premium!: boolean;

  @Expose()
    favorite!: boolean;

  @Expose()
    rating!: number;

  @Expose()
    housingType!: HousingTypeEnum;

  @Expose()
    cost!: number;

  @Expose()
    commentsCount!: number;

  @Expose()
    roomCount!: number;

  @Expose()
    guestCount!: number;

  @Expose()
    amenities!: AmenitiesEnum[];

  @Expose({name: 'userId'})
  @Type(() => UserRdo)
    offerAuthor!: UserTypeEnum;

  @Expose()
    coordinates!: CoordinatesType;
}
