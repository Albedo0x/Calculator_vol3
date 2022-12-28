import { Calculator } from './calculator';
import { CalculatorInputController } from './calculator-input-controller';

describe('Calculator input controller', () => {
    let controller = null;
    beforeEach(() => {
        controller = new CalculatorInputController(new Calculator());
    });

    describe('Push digit buttons', () => {
        test('First number append', () => {
            controller.push([
                { category: 'digit', label: '4' },
                { category: 'digit', label: '2' },
                { category: 'digit', label: '1' },
            ]);

            expect(controller.calculator.getNumber1()).toBe(421);
        });

        test('Second number append', () => {
            controller.push([
                { category: 'digit', label: '5' },
                { category: 'operation', label: '-' },
                { category: 'digit', label: '1' },
                { category: 'digit', label: '9' },
            ]);

            expect(controller.calculator.getNumber1()).toBe(5);
            expect(controller.calculator.getNumber2()).toBe(19);
        });

        test('Floating point numbers', () => {
            controller.push([
                { category: 'digit', label: '7' },
                { category: 'digit', label: '.' },
                { category: 'digit', label: '6' },
                { category: 'digit', label: '2' },
            ]);

            expect(controller.calculator.getNumber1()).toBe(7.62);
        });
    });

    describe('Push invalid buttons', () => {
        test('Exception on unknown button', () => {
            expect(() => controller.push({ category: 'wtf', label: '666' })).toThrow();
        });
    });

    describe('Calculation', () => {
        test('Multiply 2 integers', () => {
            controller.push([
                { category: 'digit', label: '9' },
                { category: 'operation', label: '*' },
                { category: 'digit', label: '7' },
                { type: 'execute' },
            ]);

            expect(controller.viewResult()).toStrictEqual('63.000');
        });

        test('Add 2 floating point numbers', () => {
            controller.push([
                { category: 'digit', label: '.' },
                { category: 'digit', label: '1' },
                { category: 'operation', label: '+' },
                { category: 'digit', label: '.' },
                { category: 'digit', label: '2' },
                { type: 'execute' },
            ]);

            expect(controller.viewResult()).toStrictEqual('0.300');
            expect(controller.calculator.getResult()).toBe(0.30000000000000004); // lmao
        });
    });

    describe('Clear', () => {
        test('Clear before execution', () => {
            controller.push([
                { category: 'digit', label: '3' },
                { category: 'operation', label: '+' },
                { type: 'clear' },
            ]);

            expect(controller.calculator.getNumber1()).toBe(null);
            expect(controller.calculator.getOperation()).toBe(null);
        });
    });
});
