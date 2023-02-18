import { STATE } from '../constants';
import { createStateMap } from './state-map';

export class StateManager {
    #state = null;
    #calculator = null;

    constructor(calculator) {
        this.#calculator = calculator;
        this.stateMap = createStateMap(calculator);
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
}
