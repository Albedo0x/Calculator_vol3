import { Button } from '../button';
import { ButtonType, ButtonCategory } from '../types';

const category = ButtonCategory.Operation;
const className = 'btn-operation';

export const operationButtons: Button[] = [
    { type: ButtonType.Add, category, label: '+', className },
    { type: ButtonType.Subtract, category, label: '-', className },
    { type: ButtonType.Multiply, category, label: '*', className },
    { type: ButtonType.Divide, category, label: '/', className }, // prev label - '÷'.
    { type: ButtonType.Exponent, category, label: '^', className },
];
