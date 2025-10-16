export enum GENDER {
  male = "male",
  female = "female",
}

export interface Person {
  name: string;
  surname: string;
  gender: GENDER
  cpr: string;
  address: Address;
  phone: string;
  birthdate: Date;
}