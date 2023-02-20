import { Decimal } from 'decimal.js';
import { Operation } from '../types';
import { ICalculationEngine } from './types';

export class DecimalJsCalculationEngine implements ICalculationEngine {
    exec(operation: Operation, args: number[] = []): number {
        const [number1, number2] = args;

        switch (operation) {
            case Operation.Add: return this.add(number1, number2);
            case Operation.Subtract: return this.subtract(number1, number2);
            case Operation.Multiply: return this.multiply(number1, number2);
            case Operation.Divide: return this.divide(number1, number2);
            case Operation.Exponent: return this.exponent(number1, number2);
            default:
                throw new Error('Unknown operation');
        }
    }

    private add (a: number, b: number) {
        return new Decimal(a).add(b).toNumber();
    }

    private subtract (a: number, b: number) {
        return new Decimal(a).sub(b).toNumber();
    }

    private multiply(a: number, b: number) {
        return new Decimal(a).mul(b).toNumber();
    }

    private divide(a: number, b: number) {
        return new Decimal(a).div(b).toNumber();
    }

    private exponent(a: number, b: number) {
        return new Decimal(a).pow(b).toNumber();
    }
}
