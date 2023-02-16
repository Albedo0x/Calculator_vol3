import { ButtonCategory, ButtonType } from '../../button';
import { EVENT } from '../constants';
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
                [ButtonType.MemorySave]: () => { console.log('TODO'); },
                [ButtonType.MemoryRestore]: () => { console.log('TODO'); },
                // TODO: implement memory.
                // [ButtonType.MemorySave]: this.calculator.save,
                // [ButtonType.MemoryRestore]: this.calculator.restore,
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
            this.pushOne(button);
        }
    }

    pushOne(button) {
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

    // TODO:
    // #onMemoryOperation() {
    //     if (this.operation !== null) {
    //         this.setNumber2(savedNumber);
    //     } else if (this.number2 === null) {
    //         this.setNumber1(savedNumber);
    //     }
    // }
}
