export class OneItemStorage {
    static #key = 'savedItem';

    save(item) {
        localStorage.setItem(OneItemStorage.#key, item);
    };

    restore() {
        return Number(localStorage.getItem(OneItemStorage.#key));
    };
}
