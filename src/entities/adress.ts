class Adress {
  #id: number;
  // #town: Town;
  #street: string;
  #number: string;
  #floor: string;
  #door: string;

  // TODO: add Town

  constructor(id: number, street: string, number: string, floor: string, door: string) {
    this.#id = id;
    // this.#town = town;
    this.#street = street;
    this.#number = number;
    this.#floor = floor;
    this.#door = door;
  }

  // Getters:

  getID() {
    return this.#id;
  }

  // getTown() {
  //     return this.#town;
  // }

  getStreet() {
    return this.#street;
  }

  getNumber() {
    return this.#number;
  }

  getFloor() {
    return this.getFloor;
  }

  getDoor() {
    return this.#door;
  }

  //Setters:

  // setTown(town: Town) {
  //     this.#town = town;
  // }

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
