import { ButtonType } from './constants';
import { digitButtons } from './categories/digits';
import { operationButtons } from './categories/operations';
import { memoryButtons } from './categories/memory';
import { miscButtons } from './categories/misc';

const buttons = [
    ...digitButtons,
    ...operationButtons,
    ...memoryButtons,
    ...miscButtons,
];

const buttonsMappedByType = buttons.reduce((acc, button) => {
    acc[button.type] = button;

    return acc;
}, {});

const BT = ButtonType;
const typesLayout = [
    BT.MemoryRestore, BT.Clear,  BT.MemorySave,   BT.Divide,
    BT.Digit7,        BT.Digit8, BT.Digit9,       BT.Multiply,
    BT.Digit4,        BT.Digit5, BT.Digit6,       BT.Subtract,
    BT.Digit1,        BT.Digit2, BT.Digit3,       BT.Add,
    BT.Exponent,      BT.Digit0, BT.DecimalPoint, BT.Execute,
];

export const layout = typesLayout.map(buttonType => buttonsMappedByType[buttonType]);
