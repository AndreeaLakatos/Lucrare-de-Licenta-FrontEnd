import { City } from 'src/app/models/city';
import { County } from 'src/app/models/county';

export class AdoptionrequestListModel {
  constructor(
    id: number,
    firstName: string,
    lastName: string,
    phoneNumber: string,
    email: string,
    county: County,
    city: City,
    street: string,
    reason: string,
    availableDate: Date,
    somethingElse: string,
    status: boolean,
    adoptionAnnouncementId: number
  ) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.phoneNumber = phoneNumber;
    this.email = email;
    this.county = county;
    this.city = city;
    this.street = street;
    this.reason = reason;
    this.availableDate = availableDate;
    this.somethingElse = somethingElse;
    this.status = status;
    this.adoptionAnnouncementId = adoptionAnnouncementId;
  }

  id: number;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  county: County;
  city: City;
  street: string;
  reason: string;
  availableDate: Date;
  somethingElse: string;
  status: boolean;
  adoptionAnnouncementId: number;
}
