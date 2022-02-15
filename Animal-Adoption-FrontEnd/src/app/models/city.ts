import { County } from "./county";

export interface City {
    id: number;
    name: string;
    county: County;
}