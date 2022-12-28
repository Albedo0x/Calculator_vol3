import React, { useState, useMemo } from "react";
import ButtonList from "./ButtonList";
import CalcScreen from "./CalcScreen";
import { Calculator as CalculatorModel, CalculatorInputController } from '../models';

const Calculator = function () {
  const [screen, setScreen] = useState("Hello");
  const controller = useMemo(() => new CalculatorInputController(new CalculatorModel()), []);

  return (
    <div className="calc">
      <CalcScreen screen={screen} />
      <ButtonList setScreen={setScreen} onPush={(button) => controller.push(button)} />
    </div>
  );
};

export default Calculator;
