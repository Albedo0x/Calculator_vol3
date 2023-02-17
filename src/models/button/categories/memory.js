import { ButtonType, ButtonCategory } from '../constants';

const category = ButtonCategory.Memory;

export const memoryButtons = [
    { type: ButtonType.MemoryRestore, category, label: 'MR', className: 'btn-pull' },
    { type: ButtonType.MemorySave, category, label: 'MS', className: 'btn-save' },
];
