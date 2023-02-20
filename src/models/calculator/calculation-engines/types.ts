import { Operation } from '../types';

export interface ICalculationEngine {
    exec(operation: Operation, args: number[]): number;
}
