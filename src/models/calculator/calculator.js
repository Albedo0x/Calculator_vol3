import { BasicCalculationEngine } from './calculation-engines';
import { StateManager } from './state-manager/state-manager';

export class CalculationError extends Error {
    constructor(calculator) {
        super(`Invalid input: ${calculator.getDebugData()}`);
    }
}

export class Calculator {
    #result = null;
    #engine = null;
    #stateManager = null;

    constructor() {
        this.#engine = new BasicCalculationEngine();
        this.#stateManager = new StateManager(this);
        this.clear();
    }

    onEvent(event, eventData) {
        this.#stateManager.dispatch(event, eventData);
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

    get state() {
        return this.#stateManager.getState();
    }

    calculate() {
        const { number1, number2, operation } = this;
        const result = this.#engine.exec(operation, [number1, number2]);

        if (isNaN(result) || !isFinite(result)) {
            const err = new CalculationError(this);
            this.clear();

            throw err;
        }

        // NOTE: shift values, operation remained unchanged.
        this.number1 = result;
        this.number2 = null;
        this.#result = result;

        return this;
    }

    getResult() {
        return this.#result;
    }

    getNumber1() {
        return this.number1;
    }

    setNumber1(value) {
        this.number1 = value;

        return this;
    }

    getNumber2() {
        return this.number2;
    }

    setNumber2(value) {
        this.number2 = value;

        return this;
    }

    getOperation() {
        return this.operation;
    }

    setOperation(operation) {
        this.operation = operation;

        return this;
    }

    // TODO: memory support.
    // save(value) {
    //     localStorage.setItem('savedNumber', value);
    // }

    // // what to restore???
    // restore() {
    //     const savedNumber = Number(localStorage.getItem('savedNumber'));

    //     return savedNumber;
    // }
}
