import { AnimalSize } from "./animal-size.enum";
import { AnimalType } from "./animal-type.enum";

export class UserPreferencesModel {
    constructor(hasFamily: boolean, hasChildren: boolean, livingPlace: string, animalSize: AnimalSize, animalType: AnimalType) {
        this.hasFamily = hasFamily;
        this.haveChildren = hasChildren;
        this.livingPlace = livingPlace;
        this.animalSize = animalSize;
        this.animalType = animalType;
    }

    hasFamily: boolean;
    haveChildren: boolean;
    livingPlace: string;
    animalSize: AnimalSize;
    animalType: AnimalType;
}