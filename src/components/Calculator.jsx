import React, { useState, useMemo } from "react";
import ButtonList from "./ButtonList";
import CalcScreen from "./CalcScreen";
import { Calculator as CalculatorModel, CalculatorInputController, CalculatorOutputController } from '../models';

const Calculator = function () {
  const [screen, setScreen] = useState('~ hi ~');
  const { inputController, outputController } = useMemo(() => {
    const calculator = new CalculatorModel();

    return {
      inputController: new CalculatorInputController(calculator),
      outputController: new CalculatorOutputController(calculator),
    };
  }, []);

  const handleButtonPush = (button) => {
    inputController.push(button);
    setScreen(outputController.getView());
  }

  return (
    <div className="calc">
      <CalcScreen screen={screen} />
      <ButtonList onPush={handleButtonPush} />
    </div>
  );
};

export default Calculator;
