import { Town } from "./town.js";

class Adress {
	#id: number;
	#town: Town;
	#street: string;
	#number: number;
	#floor: number;
	#door: number;

	constructor(
		id: number,
		town: Town,
		street: string,
		number: number,
		floor: number,
		door: number,
	) {
		this.#id = id;
		this.#town = town;
		this.#street = street;
		this.#number = number;
		this.#floor = floor;
		this.#door = door;
	}

	// Getters:

	getID() {
		return this.#id;
	}

	getTown() {
		return this.#town;
	}

	getStreet() {
		return this.#street;
	}

	getNumber() {
		return this.#number;
	}

	getFloor() {
		return this.#floor;
	}

	getDoor() {
		return this.#door;
	}

	//Setters:

	setTown(town: Town) {
		this.#town = town;
	}

	setStreet(street: string) {
		this.#street = street;
	}

	setNumber(number: string) {
		this.#number = number;
	}

	setfloor(floor: string) {
		this.#floor = floor;
	}

	setDoor(door: string) {
		this.#door = door;
	}
}

export { Adress };
