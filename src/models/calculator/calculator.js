import { BasicCalculationEngine } from './calculation-engines';
import { StateManager } from './state-manager/state-manager';
import { OneItemStorage } from './storage';

export class CalculationError extends Error {
    constructor(calculator) {
        super(`Invalid input: ${calculator.getDebugData()}`);
    }
}

export class Calculator {
    #number1 = null;
    #number2 = null;
    #operation = null;
    #result = null;

    #engine = null;
    #stateManager = null;
    #storage = null;

    constructor() {
        this.#engine = new BasicCalculationEngine();
        this.#stateManager = new StateManager(this);
        this.#storage = new OneItemStorage();
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
        this.#number1 = null;
        this.#number2 = null;
        this.#operation = null;
        this.#result = null;
    }

    get state() {
        return this.#stateManager.getState();
    }

    calculate() {
        const result = this.#engine.exec(
            this.#operation,
            [this.#number1, this.#number2],
        );

        if (isNaN(result) || !isFinite(result)) {
            const err = new CalculationError(this);
            this.clear();

            throw err;
        }

        // NOTE: shift values, operation remained unchanged.
        this.#number1 = result;
        this.#number2 = null;
        this.#result = result;

        return this;
    }

    getResult() {
        return this.#result;
    }

    getNumber1() {
        return this.#number1;
    }

    setNumber1(value) {
        this.#number1 = value;

        return this;
    }

    getNumber2() {
        return this.#number2;
    }

    setNumber2(value) {
        this.#number2 = value;

        return this;
    }

    getOperation() {
        return this.#operation;
    }

    setOperation(operation) {
        this.#operation = operation;

        return this;
    }

    save(value) {
        this.#storage.save(value);
    }

    restore() {
        return this.#storage.restore();
    }
}
