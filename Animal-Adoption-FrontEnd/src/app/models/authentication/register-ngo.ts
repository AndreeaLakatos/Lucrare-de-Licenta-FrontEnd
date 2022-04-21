export class RegisterNgo {
  constructor(
    firstName: string,
    lastName: string,
    userName: string,
    email: string,
    phoneNumber: string,
    street: string,
    county: string,
    city: string,
    ngoName: string,
    code: string,
    foundedDate: Date,
    ngoStreet: string,
    ngoCounty: string,
    ngoCity: string,
    password: string
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.userName = userName;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.street = street;
    this.city = city;
    this.county = county;
    this.ngoCity = ngoCity;
    this.ngoCounty = ngoCounty;
    this.ngoStreet = ngoStreet;
    this.ngoName = ngoName;
    this.code = code;
    this.foundedDate = foundedDate;
    this.password = password;
  }
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  phoneNumber: string;
  street: string;
  county: string;
  city: string;
  ngoName: string;
  code: string;
  foundedDate: Date;
  ngoStreet: string;
  ngoCounty: string;
  ngoCity: string;
  password: string;
}
