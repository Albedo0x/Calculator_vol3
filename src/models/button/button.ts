import { ButtonCategory, ButtonType } from './types';

export class Button {
    constructor(
        public readonly type: ButtonType,
        public readonly category: ButtonCategory,
        public readonly label: string,
        public readonly className?: string,
    ) {}
}
