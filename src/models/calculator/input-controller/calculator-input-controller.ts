import { Button, ButtonCategory, ButtonType } from '../../button';
import { toArray } from '../../../utils';
import { State, CalculatorEventType } from '../types';
import { Calculator } from '../calculator';

export type CalculatorInputControllerConfig = {
    maxLength?: number;
};

export class CalculatorInputController {
    private numberBuffer: string;
    private buttonToActionMapping: {
        byType: Partial<Record<ButtonType, (button: Button) => void>>;
        byCategory: Partial<Record<ButtonCategory, (button: Button) => void>>;
    };

    constructor (public calculator: Calculator, public config: CalculatorInputControllerConfig = {}) {
        this.buttonToActionMapping = {
            byType: {
                [ButtonType.Clear]: () => this.onClear(),
                [ButtonType.Execute]: () => this.onExecute(),
                [ButtonType.MemorySave]: () => this.onMemorySave(),
                [ButtonType.MemoryRestore]: () => this.onMemoryRestore(),
                [ButtonType.DecimalPoint]: () => this.onDecimalPoint(),
            },
            byCategory: {
                [ButtonCategory.Digit]: (button: Button) => this.onDigit(button.label),
                [ButtonCategory.Operation]: (button: Button) => this.onOperation(button.label),
            }
        };
        this.clearBuffer();
    }

    push(buttonOrButtons: Button | Button[]) {
        for (const button of toArray(buttonOrButtons)) {
            this.pushOne(button);
        }
    }

    private pushOne(button: Button) {
        const { type, category } = button;
        const calculatorAction = this.buttonToActionMapping.byType[type]
            || this.buttonToActionMapping.byCategory[category];

        if (typeof calculatorAction !== 'function') {
            throw new Error(`Calculator action is not defined for button: ${JSON.stringify(button)}`);
        }

        calculatorAction.bind(this.calculator)(button);
    }

    private clearBuffer() {
        this.numberBuffer = '';
    }

    private appendToNumberBuffer(value: string) {
        this.numberBuffer = `${this.numberBuffer}${value}`;
    }

    private onDigit(digit: string) {
        const { maxLength } = this.config;

        if (!maxLength || this.numberBuffer.length < maxLength) {
            this.appendToNumberBuffer(digit);
        }

        this.calculator.onEvent(CalculatorEventType.OnNumber, { number: Number(this.numberBuffer), rawValue: this.numberBuffer });
    }

    private onDecimalPoint() {
        if (!this.numberBuffer.includes('.')) {
            this.appendToNumberBuffer('.');
        }
    }

    private onOperation(label: string) {
        this.calculator.onEvent(CalculatorEventType.OnOperation, { operation: label });
        this.clearBuffer();
    }

    private onExecute() {
        this.calculator.onEvent(CalculatorEventType.OnExecute);
        this.clearBuffer();
    }

    private onClear() {
        this.calculator.onEvent(CalculatorEventType.OnClear);
        this.clearBuffer();
    }

    private onMemorySave() {
        switch (this.calculator.state) {
            case State.FirstNumber:
                return this.calculator.memorySave(this.calculator.getNumber1());
            case State.NumbersAndOperation:
                return this.calculator.memorySave(this.calculator.getNumber2());
            case State.Executed:
                return this.calculator.memorySave(this.calculator.getResult());
            default:
                // no default
        }
    }

    private onMemoryRestore() {
        const value = this.calculator.memoryRestore();

        if (value !== null) {
            this.numberBuffer = String(value);
            this.calculator.onEvent(CalculatorEventType.OnNumber, { number: Number(value) });
        }
    }
}
