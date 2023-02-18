import { ButtonCategory, ButtonType } from '../../button';
import { EVENT, STATE } from '../constants';
import { toArray } from '../../../utils';

export class CalculatorInputController {
    #numberBuffer;
    #buttonToActionMapping;

    constructor (calculator, config = {}) {
        this.calculator = calculator;
        this.config = config;
        this.#buttonToActionMapping = {
            byType: {
                [ButtonType.Clear]: () => this.#onClear(),
                [ButtonType.Execute]: () => this.#onExecute(),
                [ButtonType.MemorySave]: () => this.#onMemorySave(),
                [ButtonType.MemoryRestore]: () => this.#onMemoryRestore(),
                [ButtonType.DecimalPoint]: () => this.#onDecimalPoint(),
            },
            byCategory: {
                [ButtonCategory.Digit]: label => this.#onDigit(label),
                [ButtonCategory.Operation]: label => this.#onOperation(label),
            }
        };
        this.#clearBuffer();
    }

    push(buttonOrButtons) {
        for (const button of toArray(buttonOrButtons)) {
            this.#pushOne(button);
        }
    }

    #pushOne(button) {
        const { type, category, label } = button;
        const calculatorAction = this.#buttonToActionMapping.byType[type]
            || this.#buttonToActionMapping.byCategory[category];

        if (typeof calculatorAction !== 'function') {
            throw new Error(`Calculator action is not defined for button: ${JSON.stringify(button)}`);
        }

        calculatorAction.bind(this.calculator)(label);
    }

    #clearBuffer() {
        this.#numberBuffer = '';
    }

    #appendToNumberBuffer(value) {
        this.#numberBuffer = `${this.#numberBuffer || 0}${value}`;
    }

    #onDigit(digit) {
        const { maxLength } = this.config;

        if (!maxLength || this.#numberBuffer.length < maxLength) {
            this.#appendToNumberBuffer(digit);
        }

        this.calculator.onEvent(EVENT.ON_NUMBER, { number: Number(this.#numberBuffer), rawValue: this.#numberBuffer });
    }

    #onDecimalPoint() {
        if (!this.#numberBuffer.includes('.')) {
            this.#appendToNumberBuffer('.');
        }
    }

    #onOperation(label) {
        this.calculator.onEvent(EVENT.ON_OPERATION, { operation: label });
        this.#clearBuffer();
    }

    #onExecute() {
        this.calculator.onEvent(EVENT.ON_EXECUTE);
        this.#clearBuffer();
    }

    #onClear() {
        this.calculator.onEvent(EVENT.ON_CLEAR);
        this.#clearBuffer();
    }

    #onMemorySave() {
        switch (this.calculator.state) {
            case STATE.FIRST_NUMBER:
                return this.calculator.memorySave(this.calculator.getNumber1());
            case STATE.NUMBERS_AND_OPERATION:
                return this.calculator.memorySave(this.calculator.getNumber2());
            case STATE.EXECUTED:
                return this.calculator.memorySave(this.calculator.getResult());
            default:
                // no default
        }
    }

    #onMemoryRestore() {
        const value = this.calculator.memoryRestore();

        if (value || value === 0) {
            this.#numberBuffer = value.toString();
            this.calculator.onEvent(EVENT.ON_NUMBER, { number: Number(value), rawValue: value });
        }
    }
}
