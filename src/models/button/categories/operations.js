import { ButtonType, ButtonCategory } from '../constants';

const category = ButtonCategory.Operation;
const className = 'btn-operation';

export const operationButtons = [
    { type: ButtonType.Add, category, label: '+', className },
    { type: ButtonType.Subtract, category, label: '-', className },
    { type: ButtonType.Multiply, category, label: '*', className },
    { type: ButtonType.Divide, category, label: '/', label2: '÷', className },
    { type: ButtonType.Exponent, category, label: '^', className },
];
