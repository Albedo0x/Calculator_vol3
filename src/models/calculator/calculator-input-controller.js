import { ButtonCategory, ButtonType } from '../button';
import { STATE } from './constants';
import { toArray } from '../../utils';

export class CalculatorInputController {
    #number1Buffer;
    #number2Buffer;

    constructor (calculator, onResult) {
        this.calculator = calculator;
        this.onResult = onResult;
        this.#clearBuffers();

        this.buttonToActionMapping = {
            byType: {
                [ButtonType.Clear]: () => this.#onClear(),
                [ButtonType.Execute]: this.calculator.calculate,
                [ButtonType.MemorySave]: this.calculator.save,
                [ButtonType.MemoryRestore]: this.calculator.restore,
            },
            byCategory: {
                [ButtonCategory.Digit]: label => this.#onDigit(label),
                [ButtonCategory.Operation]: label => this.#onOperation(label),
            }
        };
    }

    #clearBuffers() {
        this.#number1Buffer = '';
        this.#number2Buffer = '';
    }

    push(buttonOrButtons) {
        return this.pushMany(toArray(buttonOrButtons))
    }

    pushMany(buttons) {
        for (const button of buttons) {
            this.pushOne(button);
        }
    }

    pushOne(button) {
        // console.log('pushed', button);

        const { type, category, label } = button;
        const calculatorAction = this.buttonToActionMapping.byType[type]
            || this.buttonToActionMapping.byCategory[category];

        if (typeof calculatorAction !== 'function') {
            throw new Error(`Calculator action is not defined for button: ${JSON.stringify(button)}`);
        }

        return calculatorAction.bind(this.calculator)(label);
    }

    viewResult() {
        return this.calculator.getResult({ formatted: true });
    }

    // NOTE: any digit or decimal point.
    #onDigit(digit) {
        const { state } = this.calculator;
        const append = (a, b) => `${a || 0}${b}`.replace(/\.+/g, '.');

        // console.log(`state is ${state}`);

        if (state === STATE.EXECUTED) {
            //
        }

        if ([STATE.EMPTY, STATE.FIRST_NUMBER].includes(state)) {
            this.#number1Buffer = append(this.#number1Buffer || this.calculator.getNumber1(), digit);
            this.calculator.setNumber1(Number(this.#number1Buffer));
        } else if ([STATE.FIRST_NUMBER_AND_OPERATION, STATE.NUMBERS_AND_OPERATION].includes(state)) {
            this.#number2Buffer = append(this.#number2Buffer || this.calculator.getNumber2(), digit);
            this.calculator.setNumber2(Number(this.#number2Buffer));
        }
    }

    // TODO: if executed or not
    #onOperation(label) {
        this.calculator.setOperation(label);
    }

    #onClear() {
        this.#clearBuffers();
        this.calculator.clear();
    }

    // TODO:
    #onMemoryOperation() {
        // if (this.operation !== null) {
        //     this.setNumber2(savedNumber);
        // } else if (this.number2 === null) {
        //     this.setNumber1(savedNumber);
        // }
    }
}
