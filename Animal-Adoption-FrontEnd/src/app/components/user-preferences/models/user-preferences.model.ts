import { AnimalSize } from "./animal-size.enum";
import { AnimalType } from "./animal-type.enum";

export class UserPreferencesModel {
    constructor(requestSent: boolean, open: boolean, animalSize: AnimalSize, animalType: AnimalType) {
        this.requestSent = requestSent;
        this.open = open;
        this.animalSize = animalSize;
        this.animalType = animalType;
    }

    requestSent: boolean;
    open: boolean;
    animalSize: AnimalSize;
    animalType: AnimalType;
}