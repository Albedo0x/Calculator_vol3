import { ButtonType, ButtonCategory } from '../constants';

const category = ButtonCategory.Memory;

export const memoryButtons = [
    { type: ButtonType.MemoryRestore, category, label: 'MC', className: 'btn-pull' },
    { type: ButtonType.MemorySave, category, label: 'MR', className: 'btn-save' },
];
