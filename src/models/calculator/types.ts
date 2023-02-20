export enum Operation {
    Add = '+',
    Subtract = '-',
    Multiply = '*',
    Divide = '/',
    Exponent = '^',
}

export enum CalculatorEventType {
    OnClear = 'on_clear',
    OnNumber = 'on_number',
    OnOperation = 'on_operation',
    OnExecute = 'on_execute',
}

export enum State {
    Empty = 'empty',
    FirstNumber = 'first_number',
    FirstNumberAndOperation = 'first_number_and_operation',
    NumbersAndOperation = 'numbers_and_operation',
    Executed = 'executed',
}
