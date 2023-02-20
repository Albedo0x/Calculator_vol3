import { Calculator } from '../calculator';
import { State } from '../types';

export type CalculatorOutputControllerConfig = {
    maxLength?: number;
}

export class CalculatorOutputController {
    constructor (public calculator: Calculator, public config: CalculatorOutputControllerConfig = {}) {
        this.calculator = calculator;
        this.config = config;
    }

    getView(): string {
        switch (this.calculator.state) {
            case State.Empty:
            case State.FirstNumber:
                return this.view(this.calculator.getNumber1());
            case State.FirstNumberAndOperation:
                return this.view(this.calculator.getOperation());
            case State.NumbersAndOperation:
                return this.view(this.calculator.getNumber2());
            case State.Executed:
                return this.view(this.calculator.getResult());
            default:
                return 'ERROR';
        }
    }

    private view(result: string | number | null): string {
        const { maxLength } = this.config;
        const resultStr = (result || '0').toString();

        return maxLength ? resultStr.slice(0, maxLength) : resultStr;
    }
}
