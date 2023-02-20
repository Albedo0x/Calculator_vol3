import { Button } from '../button';
import { ButtonType, ButtonCategory } from '../types';

const category = ButtonCategory.Memory;

export const memoryButtons: Button[] = [
    { type: ButtonType.MemoryRestore, category, label: 'M↑', className: 'btn-pull' },
    { type: ButtonType.MemorySave, category, label: 'M↓', className: 'btn-save' },
];
