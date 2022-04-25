import { City } from "src/app/models/city";
import { County } from "src/app/models/county";

export class NgoDetailsModel {
    constructor(ngoName: string, code: string, ngoCounty: County, ngoCity: City, ngoStreet: string) {
        this.ngoName = ngoName;
        this.code = code;
        this.ngoCounty = ngoCounty;
        this.ngoCity = ngoCity;
        this.ngoStreet = ngoStreet;
    }
    ngoName: string;
    code: string;
    ngoCounty: County;
    ngoCity: City;
    ngoStreet: string;
}