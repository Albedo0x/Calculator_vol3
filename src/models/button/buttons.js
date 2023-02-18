
import { digitButtons } from './categories/digits';
import { operationButtons } from './categories/operations';
import { memoryButtons } from './categories/memory';
import { miscButtons } from './categories/misc';

export const buttons = [
    ...digitButtons,
    ...operationButtons,
    ...memoryButtons,
    ...miscButtons,
];

export const buttonsByType = buttons.reduce((acc, button) => {
    acc[button.type] = button;

    return acc;
}, {});
