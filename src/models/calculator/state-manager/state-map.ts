import { Calculator } from '../calculator';
import { CalculatorEventType, Operation, State } from '../types';

interface IEventData {
    number?: number;
    operation?: Operation;
}

class NumberEventData implements IEventData {
    number: number;
}

class OperationEventData implements IEventData {
    operation: Operation;
}

export type StateMap = Record<State, {
    [event in CalculatorEventType]?: {
        nextState: State;
        action: (eventData: IEventData) => void;
    }
}>;

export const createStateMap = (calculator: Calculator): StateMap => {
    return {
        [State.Empty]: {
            [CalculatorEventType.OnNumber]: {
                nextState: State.FirstNumber,
                action: ({ number } : NumberEventData) => { calculator.setNumber1(number); },
            },
            [CalculatorEventType.OnOperation]: {
                nextState: State.FirstNumberAndOperation,
                action: ({ operation } : OperationEventData) => { calculator.setNumber1(0).setOperation(operation); },
            },
        },
        [State.FirstNumber]: {
            [CalculatorEventType.OnNumber]: {
                nextState: State.FirstNumber,
                action: ({ number } : NumberEventData) => { calculator.setNumber1(number); },
            },
            [CalculatorEventType.OnOperation]: {
                nextState: State.FirstNumberAndOperation,
                action: ({ operation } : OperationEventData) => { calculator.setOperation(operation); },
            },
            [CalculatorEventType.OnClear]: {
                nextState: State.Empty,
                action: () => { calculator.clear(); },
            },
        },
        [State.FirstNumberAndOperation]: {
            [CalculatorEventType.OnNumber]: {
                nextState: State.NumbersAndOperation,
                action: ({ number } : NumberEventData) => { calculator.setNumber2(number); },
            },
            [CalculatorEventType.OnOperation]: {
                nextState: State.FirstNumberAndOperation,
                action: ({ operation } : OperationEventData) => { calculator.setOperation(operation); },
            },
            [CalculatorEventType.OnExecute]: {
                nextState: State.Executed,
                action: () => { calculator.setNumber2(calculator.getNumber1()).calculate(); },
            },
            [CalculatorEventType.OnClear]: {
                nextState: State.Empty,
                action: () => { calculator.clear(); },
            },
        },
        [State.NumbersAndOperation]: {
            [CalculatorEventType.OnNumber]: {
                nextState: State.NumbersAndOperation,
                action: ({ number } : NumberEventData) => { calculator.setNumber2(number); },
            },
            [CalculatorEventType.OnOperation]: {
                nextState: State.FirstNumberAndOperation,
                action: ({ operation } : OperationEventData) => { calculator.calculate().setOperation(operation); },
            },
            [CalculatorEventType.OnExecute]: {
                nextState: State.Executed,
                action: () => { calculator.calculate(); },
            },
            [CalculatorEventType.OnClear]: {
                nextState: State.Empty,
                action: () => { calculator.clear(); },
            },
        },
        [State.Executed]: {
            [CalculatorEventType.OnNumber]: {
                nextState: State.FirstNumber,
                action: ({ number } : NumberEventData) => { calculator.setNumber1(number); },
            },
            [CalculatorEventType.OnOperation]: {
                nextState: State.FirstNumberAndOperation,
                action: ({ operation } : OperationEventData) => { calculator.setOperation(operation); },
            },
            [CalculatorEventType.OnExecute]: {
                nextState: State.Executed,
                action: () => { calculator.setNumber2(calculator.getNumber1()).calculate(); },
            },
            [CalculatorEventType.OnClear]: {
                nextState: State.Empty,
                action: () => { calculator.clear(); },
            },
        },
    };
};