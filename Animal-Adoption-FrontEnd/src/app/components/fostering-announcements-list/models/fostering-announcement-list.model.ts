import { City } from 'src/app/models/city';
import { County } from 'src/app/models/county';
import { AnimalSize } from '../../user-preferences/models/animal-size.enum';
import { AnimalType } from '../../user-preferences/models/animal-type.enum';

export class FosteringAnnouncementListModel {
  constructor(
    id: number,
    title: string,
    description: string,
    animalType: AnimalType,
    animalSize: AnimalSize,
    county: County,
    city: City,
    street: string,
    moreDetails: string,
    status: boolean,
    hasRequest: boolean,
    photos: Photo[]
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.animalType = animalType;
    this.animalSize = animalSize;
    this.county = county;
    this.city = city;
    this.street = street;
    this.moreDetails = moreDetails;
    this.status = status;
    this.hasRequest = hasRequest;
    this.photos = photos;
  }
  id: number;
  title: string;
  description: string;
  animalType: AnimalType;
  animalSize: AnimalSize;
  county: County;
  city: City;
  street: string;
  moreDetails: string;
  status: boolean;
  hasRequest: boolean;
  photos: Photo[];
}

export class Photo {
  constructor(id: number, url: string) {
    this.id = id;
    this.url = url;
  }
  id: number;
  url: string;
}

export const AnimalTranslations: { [key in AnimalType]: string } = {
  [AnimalType.CAT]: $localize`:@@cat: Cat`,
  [AnimalType.DOG]: $localize`:@@dog: Dog`,
  [AnimalType.RABBIT]: $localize`:@@rabbit: Rabbit`,
};

export const SizeTranslations: { [key in AnimalSize]: string } = {
  [AnimalSize.EXTRA_SMALL]: $localize`:@@extraSmall: Extra small`,
  [AnimalSize.SMALL]: $localize`:@@small: Small`,
  [AnimalSize.MEDIUM]: $localize`:@@medium: Medium`,
  [AnimalSize.LARGE]: $localize`:@@large: Large`,
  [AnimalSize.EXTRA_LARGE]: $localize`:@@extraLarge: Extra large`,
};