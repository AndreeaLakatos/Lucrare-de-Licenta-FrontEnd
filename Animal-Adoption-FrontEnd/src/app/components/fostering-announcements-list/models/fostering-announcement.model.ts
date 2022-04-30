import { AnimalSize } from '../../user-preferences/models/animal-size.enum';
import { AnimalType } from '../../user-preferences/models/animal-type.enum';

export class FosteringAnnouncementModel {
  constructor(
    id: number,
    title: string,
    description: string,
    animalType: AnimalType,
    animalSize: AnimalSize,
    startDate: Date,
    endDate: Date,
    moreDetails: string,
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.animalType = animalType;
    this.animalSize = animalSize;
    this.startDate = startDate;
    this.endDate = endDate;
    this.moreDetails = moreDetails;
    this.username = '';
  }
  id: number;
  title: string;
  description: string;
  animalType: AnimalType;
  animalSize: AnimalSize;
  startDate: Date;
  endDate: Date;
  moreDetails: string;
  username: string;
}