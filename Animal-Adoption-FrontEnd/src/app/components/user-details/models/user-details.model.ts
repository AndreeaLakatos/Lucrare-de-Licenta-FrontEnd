import { City } from 'src/app/models/city';
import { County } from 'src/app/models/county';

export class UserDetailsModel {
  constructor(
    firstName: string,
    lastName: string,
    userName: string,
    email: string,
    phoneNumber: string,
    county: County,
    city: City,
    street: string,
    role: string
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.userName = userName;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.county = county;
    this.city = city;
    this.street = street;
    this.role = role;
  }
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  phoneNumber: string;
  county: County;
  city: City;
  street: string;
  role: string;
}
