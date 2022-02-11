import { Address } from "../address";

export interface RegisterUser {
    firstName: string;
    lastName: string;
    userName: string;
    email: string;
    phoneNumber: string;
    address: Address;
    password: string;
}