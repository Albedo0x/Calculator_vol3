import { Calculator } from '../calculator';
import { CalculatorEventType, State } from '../types';
import { createStateMap, StateMap } from './state-map';

export class StateManager {
    private state: State | null = null;
    private stateMap: StateMap;

    constructor(private calculator: Calculator) {
        this.stateMap = createStateMap(calculator);

        this.clear();
    }

    dispatch(event: any, eventData = {}) {
        if (!this.state) {
            throw new Error('State is not initialized');
        }

        const transition = this.getTransition(event, this.state);

        if (!transition) {
            return;
        }

        transition.action(eventData);
        this.setState(transition.nextState);
    };

    getState() {
        return this.state;
    }

    private setState(state: State) {
        this.state = state;
    }

    private clear() {
        this.calculator.clear();
        this.setState(State.Empty);
    }

    private getTransition = (event: CalculatorEventType, currentState: State) => {
        return this.stateMap[currentState]?.[event] || null;
    }
}
