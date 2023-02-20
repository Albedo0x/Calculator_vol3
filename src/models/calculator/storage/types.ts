export interface IStorage<T> {
    save(item: T): void;
    restore(): T | null;
}
