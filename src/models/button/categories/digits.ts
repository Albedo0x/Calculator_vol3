import { Button } from '../button';
import { ButtonType, ButtonCategory } from '../types';

const category = ButtonCategory.Digit;
const className = 'btn-digit';

export const digitButtons: Button[] = [
    { type: ButtonType.Digit0, category, label: '0', className },
    { type: ButtonType.Digit1, category, label: '1', className },
    { type: ButtonType.Digit2, category, label: '2', className },
    { type: ButtonType.Digit3, category, label: '3', className },
    { type: ButtonType.Digit4, category, label: '4', className },
    { type: ButtonType.Digit5, category, label: '5', className },
    { type: ButtonType.Digit6, category, label: '6', className },
    { type: ButtonType.Digit7, category, label: '7', className },
    { type: ButtonType.Digit8, category, label: '8', className },
    { type: ButtonType.Digit9, category, label: '9', className },
    { type: ButtonType.DecimalPoint, category, label: '.', className },
];
