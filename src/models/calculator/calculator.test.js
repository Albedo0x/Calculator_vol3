import { Calculator, CalculationError } from './calculator';
import { OPERATION, STATE } from './constants';

describe('Calculator', () => {
    let calculator = null;
    beforeEach(() => {
        calculator = new Calculator();
    });

    describe('States', () => {
        test('Initial', () => {
            expect(calculator.state).toBe(STATE.EMPTY);
        });

        test('Invalid', () => {
            calculator.setOperation(OPERATION.ADD);
            expect(() => calculator.state).toThrow();
        });
    });

    describe('Numbers input', () => {
        test('Set', () => {
            const calc = new Calculator();
            const a = -14.666;
            const b = 18.05;

            calc.setNumber1(a);
            calc.setNumber2(b);

            expect(calc.getNumber1()).toBe(a);
            expect(calc.getNumber2()).toBe(b);
            expect(calc.state).toBe(STATE.NUMBERS);
        });

        describe('Invalid input', () => {
            test('Missing argument', () => {
                const calc = new Calculator();

                calc.setNumber1(2);
                calc.setNumber2(10);

                expect(() => calc.calculate()).toThrow(CalculationError);
            });
        });
    });

    describe('Operations', () => {
        describe('Addition', () => {
            test('Integers', () => {
                calculator.setNumber1(12.5);
                calculator.setNumber2(7);
                calculator.setOperation(OPERATION.ADD);

                calculator.calculate();

                expect(calculator.getResult()).toBe(19.5);
                expect(calculator.getResult({ formatted: true })).toBe('19.500');
            });
        });

        describe('Subtraction', () => {
            test('Integers', () => {
                calculator.setNumber1(98);
                calculator.setNumber2(89);
                calculator.setOperation(OPERATION.SUBTRACT);

                calculator.calculate();

                expect(calculator.getResult()).toBe(9);
            });
        });

        describe('Division', () => {
            test('Integers', () => {
                calculator.setOperation(OPERATION.DIVIDE);
                calculator.setNumber1(20);
                calculator.setNumber2(5);

                calculator.calculate();

                expect(calculator.getResult()).toBe(4);
            });
        });

        describe('Exponent', () => {
            test('Integers', () => {
                calculator.setNumber1(2);
                calculator.setOperation(OPERATION.EXPONENT);
                calculator.setNumber2(10);

                calculator.calculate();

                expect(calculator.getResult()).toBe(1024);
            });
        });
    });

    describe('After calculation', () => {
        test.skip('Continue', () => {
            const calc = new Calculator();

            calc.setNumber1(4);
            calc.setNumber2(2);
            calc.setOperation(OPERATION.MULTIPLY);
            calc.calculate();

            expect(calc.state).toBe(STATE.EXECUTED);

            calc.setNumber2(2);
            calc.setOperation(OPERATION.ADD);

            // FIXME: failing
            expect(calc.state).toBe(STATE.NUMBERS_AND_OPERATION);

            calc.calculate();

            expect(calc.getResult()).toBe(10);
            expect(calc.state).toBe(STATE.EXECUTED);
        });
    });

    describe('Memory', () => {
        beforeEach(() => {
            localStorage.clear();
        });

        describe('Memory save & restore', () => {
            test('Saves and restores number', () => {
                const number = 987;

                calculator.save(number);
                const savedNumber = calculator.restore();

                expect(savedNumber).toBe(number);
            });
        });
    });
});
