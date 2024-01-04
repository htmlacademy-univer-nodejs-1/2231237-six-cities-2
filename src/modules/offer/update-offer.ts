import {AmenitiesEnum} from '../../types/amenities.enum';
import {CoordinatesType} from '../../types/coords';
import {HousingTypeEnum} from '../../types/housing-type.enum';
import {CityEnum} from '../../types/city.enum';

export class UpdateOffer {
  public name!: string;
  public description!: string;
  public publicationDate!: Date;
  public city!: CityEnum;
  public previewImage!: string;
  public images!: string[];
  public premium!: boolean;
  public favorite!: boolean;
  public rating!: number;
  public housingType!: HousingTypeEnum;
  public roomCount!: number;
  public guestCount!: number;
  public cost!: number;
  public amenities!: AmenitiesEnum[];
  public userId!: string;
  public commentsCount!: number;
  public coordinates!: CoordinatesType;
}
