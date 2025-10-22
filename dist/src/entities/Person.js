import {} from "../personHandler.js";
import { Adress } from "./adress.js";
export class Person {
    #id;
    #name;
    #surname;
    #gender;
    #cpr;
    #adress;
    #phone;
    #birthdate;
    constructor(id, name, surname, gender, cpr, address, phone, birthdate) {
        this.#id = id;
        this.#name = name;
        this.#surname = surname;
        this.#gender = gender;
        this.#cpr = cpr;
        this.#adress = address;
        this.#phone = phone;
        this.#birthdate = birthdate;
    }
    get id() {
        return this.#id;
    }
    get name() {
        return this.#name;
    }
    get surname() {
        return this.#surname;
    }
    get gender() {
        return this.#gender;
    }
    get cpr() {
        return this.#cpr;
    }
    get adress() {
        return this.#adress;
    }
    get phone() {
        return this.#phone;
    }
    get birthdate() {
        return this.#birthdate;
    }
    set name(value) {
        if (value.length === 0) {
            throw new Error("Name cannot be empty");
        }
        this.#name = value;
    }
    set surname(value) {
        if (value.length === 0) {
            throw new Error("Surname cannot be empty");
        }
        this.#surname = value;
    }
    set gender(value) {
        this.#gender = value;
    }
    set adress(value) {
        this.#adress = value;
    }
    set phone(value) {
        this.#phone = value;
    }
}
