import { ButtonType } from './types';
import { buttonsByType } from './buttons';
import { Button } from './button';

const BT = ButtonType;
const buttonTypeLayout = [
    BT.MemoryRestore, BT.Clear,        BT.MemorySave, BT.Divide,
    BT.Digit7,        BT.Digit8,       BT.Digit9,     BT.Multiply,
    BT.Digit4,        BT.Digit5,       BT.Digit6,     BT.Subtract,
    BT.Digit1,        BT.Digit2,       BT.Digit3,     BT.Add,
    BT.Digit0,        BT.DecimalPoint, BT.Execute,
];

export const layout: Button[] = buttonTypeLayout.map(buttonType => buttonsByType[buttonType]);
