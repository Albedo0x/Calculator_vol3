export class OneItemStorage {
    static #key = 'savedItem';

    save(item) {
        localStorage.setItem(OneItemStorage.#key, item);
    };

    restore() {
        return localStorage.getItem(OneItemStorage.#key);
    };
}
