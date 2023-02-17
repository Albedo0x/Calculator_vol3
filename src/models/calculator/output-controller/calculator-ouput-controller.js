import { STATE } from '../constants';

export class CalculatorOutputController {
    constructor (calculator) {
        this.calculator = calculator;
    }

    viewResult() {
        const result = this.calculator.getResult();

        return result;
    }

    getView() {
        switch (this.calculator.state) {
            case STATE.EMPTY:
            case STATE.FIRST_NUMBER:
                return this.calculator.getNumber1();
            case STATE.FIRST_NUMBER_AND_OPERATION:
                return this.calculator.getOperation();
            case STATE.NUMBERS:
            case STATE.NUMBERS_AND_OPERATION:
                return this.calculator.getNumber2();
            case STATE.EXECUTED:
                return this.viewResult();
            default:
                return `[${this.calculator.state}]`;
        }
    }
}
