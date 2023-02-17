import { ButtonCategory, ButtonType } from '../../button';
import { EVENT, STATE } from '../constants';
import { toArray } from '../../../utils';

export class CalculatorInputController {
    #numberBuffer;
    #buttonToActionMapping;

    constructor (calculator) {
        this.calculator = calculator;
        this.#buttonToActionMapping = {
            byType: {
                [ButtonType.Clear]: () => this.#onClear(),
                [ButtonType.Execute]: () => this.#onExecute(),
                [ButtonType.MemorySave]: () => this.#onMemorySave(),
                [ButtonType.MemoryRestore]: () => this.#onMemoryRestore(),
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
            // console.log(`push! [${button.label}]`);
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
        // console.log(`state is ${this.calculator.state}`);
    }

    #clearBuffer() {
        this.#numberBuffer = '';
    }

    #onDigit(digit) {
        // FIXME: multiple entered points.
        const append = (a, b) => `${a || 0}${b}`.replace(/\.+/g, '.');

        this.#numberBuffer = append(this.#numberBuffer, digit);
        this.calculator.onEvent(EVENT.ON_NUMBER, { number: Number(this.#numberBuffer) });
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
                return this.calculator.save(this.calculator.getNumber1());
            case STATE.NUMBERS_AND_OPERATION:
                return this.calculator.save(this.calculator.getNumber2());
            case STATE.EXECUTED:
                return this.calculator.save(this.calculator.getResult());
            default:
                // no default
        }
    }

    #onMemoryRestore() {
        const value = this.calculator.restore();

        this.calculator.onEvent(EVENT.ON_NUMBER, { number: value });
    }
}
