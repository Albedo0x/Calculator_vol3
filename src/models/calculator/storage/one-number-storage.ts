import { IStorage } from './types';

export class OneNumberStorage implements IStorage<number | null> {
    private static key = 'savedItem';

    save(item: number) {
        localStorage.setItem(OneNumberStorage.key, String(item));
    };

    restore(): number | null {
        const item = localStorage.getItem(OneNumberStorage.key);

        return item === null ? null : Number(item);
    };
}
