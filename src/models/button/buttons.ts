import { Button } from './button';
import {
    digitButtons,
    operationButtons,
    memoryButtons,
    miscButtons,
} from './categories';
import { ButtonType } from './types';

export const buttons = [
    ...digitButtons,
    ...operationButtons,
    ...memoryButtons,
    ...miscButtons,
];

export const buttonsByType = buttons.reduce((acc, button) => {
    acc[button.type] = button;

    return acc;
}, {} as Record<ButtonType, Button>);
