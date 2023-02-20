import { DecimalJsCalculationEngine } from './calculation-engines';
import { StateManager } from './state-manager/state-manager';
import { OneNumberStorage } from './storage';
import { CalculatorEventType, Operation } from './types';

export class CalculationError extends Error {
    constructor(calculator: Calculator) {
        super(`Invalid input: ${calculator.getDebugData()}`);
    }
}

export class Calculator {
    private number1: number | null;
    private number2: number | null;
    private operation: Operation | null;
    private result: number | null;

    private engine;
    private stateManager;
    private storage;

    constructor() {
        this.engine = new DecimalJsCalculationEngine();
        this.stateManager = new StateManager(this);
        this.storage = new OneNumberStorage();
    }

    onEvent(event: CalculatorEventType, eventData = {}) {
        this.stateManager.dispatch(event, eventData);
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
        this.result = null;
    }

    get state() {
        return this.stateManager.getState();
    }

    calculate() {
        const { number1, number2, operation } = this;

        if (!operation) {
            throw new CalculationError(this);
        }

        const result = this.engine.exec(operation, [number1!, number2!]);

        if (isNaN(result) || !isFinite(result)) {
            this.clear();

            throw new CalculationError(this);
        }

        // NOTE: shift & reset values, operation remained unchanged.
        this.number1 = result;
        this.number2 = null;
        this.result = result;

        return this;
    }

    getResult() {
        return this.result;
    }

    getNumber1() {
        return this.number1;
    }

    setNumber1(value: number | null) {
        this.number1 = value;

        return this;
    }

    getNumber2() {
        return this.number2;
    }

    setNumber2(value: number | null) {
        this.number2 = value;

        return this;
    }

    getOperation() {
        return this.operation;
    }

    setOperation(operation: Operation) {
        this.operation = operation;

        return this;
    }

    memorySave(value: number | null): void {
        if (value === null) {
            return;
        }

        this.storage.save(value);
    }

    memoryRestore(): number | null {
        return this.storage.restore();
    }
}
