import { clone } from 'radash';
import { buttonsByType } from './buttons';

export class ButtonFactory {
    static #instance;

    static getInstance() {
        if (ButtonFactory.#instance) {
            return ButtonFactory.#instance;
        }

        ButtonFactory.#instance = new ButtonFactory();

        return ButtonFactory.#instance;
    }

    createOfType(buttonType) {
        const button = buttonsByType[buttonType];

        if (!button) {
            throw new Error(`Unknown button type [${buttonType}]`);
        }

        // TODO: implement button as a class, call new Button();
        return clone(button);
    }
}
