class Adress {
    #id;
    // #town: Town;
    #street;
    #number;
    //#floor: string;
    #door;
    // TODO: add Town
    constructor(id, street, number, floor, door) {
        this.#id = id;
        // this.#town = town;
        this.#street = street;
        this.#number = number;
        //this.#floor = floor;
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
    setStreet(street) {
        this.#street = street;
    }
    setNumber(number) {
        this.#number = number;
    }
    //setfloor(floor: string) {
    //this.#floor = floor;
    //}
    setDoor(door) {
        this.#door = door;
    }
}
export { Adress };
