class Town {
  #id: number;
  #postalCode: string;
  #name: string;

  constructor(id: number, postalCode: string, name: string) {
    this.#id = id;
    this.#postalCode = postalCode;
    this.#name = name;
  }

  // Getters:

  getID() {
    return this.#id;
  }

  getPostalCode() {
    return this.#postalCode;
  }

  getName() {
    return this.#name;
  }

  // Setters:

  setPostalCode(postalCode: string) {
    this.#postalCode = postalCode;
  }

  setName(name: string) {
    this.#name = name;
  }
}

export { Town };
