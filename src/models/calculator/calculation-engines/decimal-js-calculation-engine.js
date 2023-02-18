import { Decimal } from 'decimal.js';
import { OPERATION } from '../constants';

export class DecimalJsCalculationEngine {
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
        return new Decimal(a).add(b).toNumber();
    }

    #subtract (a, b) {
        return new Decimal(a).sub(b).toNumber();
    }

    #multiply(a, b) {
        return new Decimal(a).mul(b).toNumber();
    }

    #divide(a, b) {
        return new Decimal(a).div(b).toNumber();
    }

    #exponent(a, b) {
        return new Decimal(a).pow(b).toNumber();
    }
}
