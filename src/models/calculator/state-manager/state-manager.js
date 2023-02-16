import { STATE, EVENT } from '../constants';

export class StateManager {
    #state = null;
    #calculator = null;

    constructor(calculator) {
        this.#calculator = calculator;
        this.#clear();
    }

    dispatch(event, eventData = {}) {
        const transition = this.#getTransition(event, this.#state);

        if (!transition) {
            return;
        }

        transition.action(eventData);
        this.#setState(transition.nextState);
    };

    getState() {
        return this.#state;
    }

    #setState(state) {
        this.#state = state;
    }

    #clear() {
        this.#calculator.clear();
        this.#setState(STATE.EMPTY);
    }

    #getTransition = (event, currentState) => {
        return this.stateMap[currentState]?.[event] || null;
    }

    stateMap = {
        [STATE.EMPTY]: {
            [EVENT.ON_NUMBER]: {
                nextState: STATE.FIRST_NUMBER,
                action: ({ number }) => { this.#calculator.setNumber1(number); },
            },
            [EVENT.ON_OPERATION]: {
                nextState: STATE.FIRST_NUMBER_AND_OPERATION,
                action: ({ operation }) => { this.#calculator.setNumber1(0).setOperation(operation); },
            },
        },
        [STATE.FIRST_NUMBER]: {
            [EVENT.ON_NUMBER]: {
                nextState: STATE.FIRST_NUMBER,
                action: ({ number }) => { this.#calculator.setNumber1(number); },
            },
            [EVENT.ON_OPERATION]: {
                nextState: STATE.FIRST_NUMBER_AND_OPERATION,
                action: ({ operation }) => { this.#calculator.setOperation(operation); },
            },
            [EVENT.ON_CLEAR]: {
                nextState: STATE.EMPTY,
                action: () => { this.#clear(); },
            },
        },
        [STATE.FIRST_NUMBER_AND_OPERATION]: {
            [EVENT.ON_NUMBER]: {
                nextState: STATE.NUMBERS_AND_OPERATION,
                action: ({ number }) => { this.#calculator.setNumber2(number); },
            },
            [EVENT.ON_OPERATION]: {
                nextState: STATE.ON_OPERATION,
                action: ({ operation }) => { this.#calculator.setOperation(operation); },
            },
            [EVENT.ON_EXECUTE]: {
                nextState: STATE.EXECUTED,
                action: () => { this.#calculator.setNumber2(this.#calculator.getNumber1()).calculate(); },
            },
            [EVENT.ON_CLEAR]: {
                nextState: STATE.EMPTY,
                action: () => { this.#clear(); },
            },
        },
        [STATE.NUMBERS_AND_OPERATION]: {
            [EVENT.ON_NUMBER]: {
                nextState: STATE.NUMBERS_AND_OPERATION,
                action: ({ number }) => { this.#calculator.setNumber2(number); },
            },
            [EVENT.ON_OPERATION]: {
                nextState: STATE.FIRST_NUMBER_AND_OPERATION,
                action: ({ operation }) => { this.#calculator.calculate().setOperation(operation); },
            },
            [EVENT.ON_EXECUTE]: {
                nextState: STATE.EXECUTED,
                action: () => { this.#calculator.calculate(); },
            },
            [EVENT.ON_CLEAR]: {
                nextState: STATE.EMPTY,
                action: () => { this.#clear(); },
            },
        },
        [STATE.EXECUTED]: {
            [EVENT.ON_NUMBER]: {
                nextState: STATE.FIRST_NUMBER,
                action: ({ number }) => { this.#calculator.setNumber1(number); },
            },
            [EVENT.ON_OPERATION]: {
                nextState: STATE.FIRST_NUMBER_AND_OPERATION,
                action: ({ operation }) => { this.#calculator.setOperation(operation); },
            },
            [EVENT.ON_EXECUTE]: {
                nextState: STATE.EXECUTED,
                action: () => { this.#calculator.setNumber2(this.#calculator.getNumber1()).calculate(); },
            },
            [EVENT.ON_CLEAR]: {
                nextState: STATE.EMPTY,
                action: () => { this.#clear(); },
            },
        },
    };
}
