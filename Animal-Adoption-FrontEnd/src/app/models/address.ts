import { City } from "./city";
import { County } from "./county";

export interface Address {
    id: number;
    street: string;
    city: City;
    county: County;
}