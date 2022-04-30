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
    startDate: Date,
    endDate: Date,
    county: County,
    city: City,
    street: string,
    moreDetails: string,
    photos: Photo[]
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.animalType = animalType;
    this.animalSize = animalSize;
    this.startDate = startDate;
    this.endDate = endDate;
    this.county = county;
    this.city = city;
    this.street = street;
    this.moreDetails = moreDetails;
    this.photos = photos;
  }
  id: number;
  title: string;
  description: string;
  animalType: AnimalType;
  animalSize: AnimalSize;
  startDate: Date;
  endDate: Date;
  county: County;
  city: City;
  street: string;
  moreDetails: string;
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
  [AnimalType.CAT]: 'cat',
  [AnimalType.DOG]: 'dog',
  [AnimalType.RABBIT]: 'rabbit',
};

export const SizeTranslations: { [key in AnimalSize]: string } = {
  [AnimalSize.EXTRA_SMALL]: 'extraSmall',
  [AnimalSize.SMALL]: 'small',
  [AnimalSize.MEDIUM]: 'medium',
  [AnimalSize.LARGE]: 'large',
  [AnimalSize.EXTRA_LARGE]: 'extraLarge',
};