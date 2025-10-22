class Town {
    #id;
    #postalCode;
    #name;
    constructor(id, postalCode, name) {
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
    setPostalCode(postalCode) {
        this.#postalCode = postalCode;
    }
    setName(name) {
        this.#name = name;
    }
}
export { Town };
