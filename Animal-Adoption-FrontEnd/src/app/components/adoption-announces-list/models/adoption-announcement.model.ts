import { AnimalSize } from '../../user-preferences/models/animal-size.enum';
import { AnimalType } from '../../user-preferences/models/animal-type.enum';

export class AdoptionAnnouncementModel {
  constructor(
    id: number,
    title: string,
    description: string,
    animalType: AnimalType,
    animalSize: AnimalSize,
    moreDetails: string,
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.animalType = animalType;
    this.animalSize = animalSize;
    this.moreDetails = moreDetails;
    this.username = '';
  }
  id: number;
  title: string;
  description: string;
  animalType: AnimalType;
  animalSize: AnimalSize;
  moreDetails: string;
  username: string;
}
