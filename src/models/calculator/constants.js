export const STATE = {
    EMPTY: 'state_0000',
    FIRST_NUMBER: 'state_1000',
    NUMBERS: 'state_1100',
    FIRST_NUMBER_AND_OPERATION: 'state_1010',
    NUMBERS_AND_OPERATION: 'state_1110',
    EXECUTED: 'state_1011',
};

export const EVENT = {
    ON_CLEAR: 'on_clear',
    ON_NUMBER: 'on_number',
    ON_OPERATION: 'on_operation',
    ON_EXECUTE: 'on_execute',
};

export const OPERATION = {
    ADD: '+',
    SUBTRACT: '-',
    MULTIPLY: '*',
    DIVIDE: '/',
    EXPONENT: '^',
};
