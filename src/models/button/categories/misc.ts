import { Button } from '../button';
import { ButtonType, ButtonCategory } from '../types';

export const miscButtons: Button[] = [
    { type: ButtonType.Clear, category: ButtonCategory.Clear, label: 'C', className: 'clear-all' },
    { type: ButtonType.Execute, category: ButtonCategory.Execute, label: '=', className: 'btn-result' },
];
