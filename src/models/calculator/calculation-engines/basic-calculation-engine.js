import { OPERATION } from '../constants';

export class BasicCalculationEngine {
    exec(operation, args = []) {
        const [number1, number2] = args;

        switch (operation) {
            case OPERATION.ADD: return this.#add(number1, number2);
            case OPERATION.SUBTRACT: return this.#subtract(number1, number2);
            case OPERATION.MULTIPLY: return this.#multiply(number1, number2);
            case OPERATION.DIVIDE: return this.#divide(number1, number2);
            case OPERATION.EXPONENT: return this.#exponent(number1, number2);
            default:
                throw new Error('Unknown operation');
        }
    }

    #add (a, b) {
        return a + b;
    }

    #subtract (a, b) {
        return a - b;
    }

    #multiply(a, b) {
        return a * b;
    }

    #divide(a, b) {
        return a / b;
    }

    #exponent(a, b) {
        return a ** b;
    }
}
