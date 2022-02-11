import { City } from "./enums/city";
import { County } from "./enums/county";

export interface Address {
    id: number;
    street: string;
    city: City;
    county: County;
}