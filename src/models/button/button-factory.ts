import { Button } from './button';
import { buttonsByType } from './buttons';
import { ButtonType } from './types';

export class ButtonFactory {
    private static instance: ButtonFactory;

    static getInstance() {
        if (ButtonFactory.instance) {
            return ButtonFactory.instance;
        }

        ButtonFactory.instance = new ButtonFactory();

        return ButtonFactory.instance;
    }

    createOfType(buttonType: ButtonType): Button {
        const button = buttonsByType[buttonType];

        if (!button) {
            throw new Error(`Unknown button type [${buttonType}]`);
        }

        return new Button(button.type, button.category, button.label, button.className);
    }
}
