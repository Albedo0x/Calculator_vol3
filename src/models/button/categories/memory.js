import { ButtonType, ButtonCategory } from '../constants';

const category = ButtonCategory.Memory;

export const memoryButtons = [
    { type: ButtonType.MemoryRestore, category, label: 'M↑', className: 'btn-pull' },
    { type: ButtonType.MemorySave, category, label: 'M↓', className: 'btn-save' },
];
