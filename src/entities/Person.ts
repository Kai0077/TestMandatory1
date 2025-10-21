export type TGender = "male" | "female";

export class Person {
  #id: number;
  #name: string;
  #surname: string;
  #gender: TGender;
  #cpr: string;
  //#address: Address;
  #phone: string;
  #birthdate: Date;

  constructor(
    id: number,
    name: string,
    surname: string,
    gender: TGender,
    cpr: string,
    //address: Address,
    phone: string,
    birthdate: Date
  ) {
    this.#id = id;
    this.#name = name;
    this.#surname = surname;
    this.#gender = gender;
    this.#cpr = cpr;
    //this.#address = address;
    this.#phone = phone;
    this.#birthdate = birthdate;
  }

  get id(): number {
    return this.#id;
  }

  get name(): string {
    return this.#name;
  }

  get surname(): string {
    return this.#surname;
  }

  get gender(): TGender {
    return this.#gender;
  }

  get cpr(): string {
    return this.#cpr;
  }

  // get address(): string {
  //   return this.#address;
  // }

  get phone(): string {
    return this.#phone;
  }

  get birthdate(): Date {
    return this.#birthdate;
  }

  set name(value: string) {
    if (!value) {
      throw new Error("Name cannot be empty");
    }
    this.#name = value;
  }

  set surname(value: string) {
    if (!value) {
      throw new Error("Surname cannot be empty");
    }
    this.#surname = value;
  }

  set gender(value: TGender) {
    if (value !== "male" && value !== "female") {
      throw new Error("Invalid gender");
    }
    this.#gender = value;
  }

  /* set address(value: string) {
    this.#address = value;
  } */

  set phone(value: string) {
    this.#phone = value;
  }
}