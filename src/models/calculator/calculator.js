import { STATE, OPERATION } from './constants';

export class CalculationError extends Error {
    constructor(calculator) {
        super(`Invalid input: ${calculator.getDebugData()}`);
    }
}

export class Calculator {
    #result = null;

    constructor() {
        this.clear();
    }

    getDebugData() {
        return JSON.stringify([
            this.getNumber1(),
            this.getNumber2(),
            this.getOperation(),
            this.getResult(),
        ]);
    }

    clear() {
        this.number1 = null;
        this.number2 = null;
        this.operation = null;
        this.#result = null;
    }

    getResult({ formatted = false } = {}) {
        return formatted ? this.formatResult(this.#result) : this.#result;
    }

    get state() {
        const stateCode = [
            this.number1,
            this.number2,
            this.operation,
            this.#result,
        ]
            .map(x => x === null ? 0 : 1)
            .join('');

        const inferredState = `state_${stateCode}`;

        if (Object.values(STATE).includes(inferredState)) {
            return inferredState;
        }

        throw new Error(`Invalid state: ${this.getDebugData()}`);
    }

    calculate() {
        const { number1, number2: n2, operation } = this;

        let result = NaN;
        const number2 = n2 ?? number1;

        switch (operation) {
            case OPERATION.ADD: result = number1 + number2; break;
            case OPERATION.SUBTRACT: result = number1 - number2; break;
            case OPERATION.MULTIPLY: result = number1 * number2; break;
            case OPERATION.DIVIDE: result = number1 / number2; break;
            case OPERATION.EXPONENT: result = number1 ** number2; break;
            default:
                // no default
        }

        if (isNaN(result) || !isFinite(result)) {
            const err = new CalculationError(this);
            this.clear();

            throw err;
        }

        // console.log('~~ calculated ~~', result, this.getDebugData());

        this.number1 = result;
        this.number2 = null;
        this.#result = result;
    }

    formatResult(value) {
        return value.toFixed(3);
    }

    setNumber1(value) {
        this.number1 = value;
    }

    setNumber2(value) {
        this.number2 = value;
    }

    getNumber1() {
        return this.number1;
    }

    getNumber2() {
        return this.number2;
    }

    setOperation(operation) {
        this.operation = operation;
    }

    getOperation() {
        return this.operation;
    }

    // what to save???
    save(value) {
        localStorage.setItem('savedNumber', value);
    }

    // what to restore???
    restore() {
        const savedNumber = Number(localStorage.getItem('savedNumber'));

        return savedNumber;
    }
}
