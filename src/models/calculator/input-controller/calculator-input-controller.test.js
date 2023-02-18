import { Calculator } from '../calculator';
import { CalculatorInputController } from './calculator-input-controller';
import { ButtonType, ButtonFactory } from '../../button';

describe('Calculator input controller', () => {
    let controller = null;
    const createButton = ButtonFactory.getInstance().createOfType;

    beforeEach(() => {
        controller = new CalculatorInputController(new Calculator());
    });

    describe('Push digit buttons', () => {
        test('First number append', () => {
            controller.push([
                createButton(ButtonType.Digit4),
                createButton(ButtonType.Digit2),
                createButton(ButtonType.Digit1),
            ]);

            expect(controller.calculator.getNumber1()).toBe(421);
        });

        test('Second number append', () => {
            controller.push([
                createButton(ButtonType.Digit5),
                createButton(ButtonType.Subtract),
                createButton(ButtonType.Digit1),
                createButton(ButtonType.Digit9),
            ]);

            expect(controller.calculator.getNumber1()).toBe(5);
            expect(controller.calculator.getNumber2()).toBe(19);
        });
    });

    describe('Floating point numbers', () => {
        test('Valid decimal', () => {
            controller.push([
                createButton(ButtonType.Digit7),
                createButton(ButtonType.DecimalPoint),
                createButton(ButtonType.Digit6),
                createButton(ButtonType.Digit2),
            ]);

            expect(controller.calculator.getNumber1()).toBe(7.62);
        });

        test('Invalid decimal', () => {
            controller.push([
                createButton(ButtonType.Digit7),
                createButton(ButtonType.DecimalPoint),
                createButton(ButtonType.Digit6),
                createButton(ButtonType.DecimalPoint),
            ]);

            expect(controller.calculator.getNumber1()).toBe(7.6);
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
                createButton(ButtonType.Digit9),
                createButton(ButtonType.Multiply),
                createButton(ButtonType.Digit7),
                createButton(ButtonType.Execute),
            ]);

            expect(controller.calculator.getNumber1()).toBe(63);
            expect(controller.calculator.getNumber2()).toBe(null);
            expect(controller.calculator.getResult()).toBe(63);
            expect(controller.calculator.getOperation()).toBe('*');
        });

        test('Add 2 floating point numbers', () => {
            controller.push([
                createButton(ButtonType.DecimalPoint),
                createButton(ButtonType.Digit1),
                createButton(ButtonType.Add),
                createButton(ButtonType.DecimalPoint),
                createButton(ButtonType.Digit2),
                createButton(ButtonType.Execute),
            ]);

            expect(controller.calculator.getResult()).toBe(0.3);
        });
    });

    describe('Clear', () => {
        test('Clear before execution', () => {
            controller.push([
                createButton(ButtonType.Digit3),
                createButton(ButtonType.Add),
                createButton(ButtonType.Clear),
            ]);

            expect(controller.calculator.getNumber1()).toBe(null);
            expect(controller.calculator.getNumber2()).toBe(null);
            expect(controller.calculator.getOperation()).toBe(null);
        });
    });
});
