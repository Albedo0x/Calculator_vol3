import { STATE, EVENT } from '../constants';

export const createStateMap = (calculator) => {
    return {
        [STATE.EMPTY]: {
            [EVENT.ON_NUMBER]: {
                nextState: STATE.FIRST_NUMBER,
                action: ({ number }) => { calculator.setNumber1(number); },
            },
            [EVENT.ON_OPERATION]: {
                nextState: STATE.FIRST_NUMBER_AND_OPERATION,
                action: ({ operation }) => { calculator.setNumber1(0).setOperation(operation); },
            },
        },
        [STATE.FIRST_NUMBER]: {
            [EVENT.ON_NUMBER]: {
                nextState: STATE.FIRST_NUMBER,
                action: ({ number }) => { calculator.setNumber1(number); },
            },
            [EVENT.ON_OPERATION]: {
                nextState: STATE.FIRST_NUMBER_AND_OPERATION,
                action: ({ operation }) => { calculator.setOperation(operation); },
            },
            [EVENT.ON_CLEAR]: {
                nextState: STATE.EMPTY,
                action: () => { calculator.clear(); },
            },
        },
        [STATE.FIRST_NUMBER_AND_OPERATION]: {
            [EVENT.ON_NUMBER]: {
                nextState: STATE.NUMBERS_AND_OPERATION,
                action: ({ number }) => { calculator.setNumber2(number); },
            },
            [EVENT.ON_OPERATION]: {
                nextState: STATE.ON_OPERATION,
                action: ({ operation }) => { calculator.setOperation(operation); },
            },
            [EVENT.ON_EXECUTE]: {
                nextState: STATE.EXECUTED,
                action: () => { calculator.setNumber2(calculator.getNumber1()).calculate(); },
            },
            [EVENT.ON_CLEAR]: {
                nextState: STATE.EMPTY,
                action: () => { calculator.clear(); },
            },
        },
        [STATE.NUMBERS_AND_OPERATION]: {
            [EVENT.ON_NUMBER]: {
                nextState: STATE.NUMBERS_AND_OPERATION,
                action: ({ number }) => { calculator.setNumber2(number); },
            },
            [EVENT.ON_OPERATION]: {
                nextState: STATE.FIRST_NUMBER_AND_OPERATION,
                action: ({ operation }) => { calculator.calculate().setOperation(operation); },
            },
            [EVENT.ON_EXECUTE]: {
                nextState: STATE.EXECUTED,
                action: () => { calculator.calculate(); },
            },
            [EVENT.ON_CLEAR]: {
                nextState: STATE.EMPTY,
                action: () => { calculator.clear(); },
            },
        },
        [STATE.EXECUTED]: {
            [EVENT.ON_NUMBER]: {
                nextState: STATE.FIRST_NUMBER,
                action: ({ number }) => { calculator.setNumber1(number); },
            },
            [EVENT.ON_OPERATION]: {
                nextState: STATE.FIRST_NUMBER_AND_OPERATION,
                action: ({ operation }) => { calculator.setOperation(operation); },
            },
            [EVENT.ON_EXECUTE]: {
                nextState: STATE.EXECUTED,
                action: () => { calculator.setNumber2(calculator.getNumber1()).calculate(); },
            },
            [EVENT.ON_CLEAR]: {
                nextState: STATE.EMPTY,
                action: () => { calculator.clear(); },
            },
        },
    };
};