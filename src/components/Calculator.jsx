import React from "react";
import ButtonList from "./ButtonList";
import CalcScreen from "./CalcScreen";

const Calculator = function ({ buttons, screen, setScreen }) {
  return (
    <div className="calc">
      <CalcScreen screen={screen} />
      <ButtonList buttons={buttons} screen={screen} setScreen={setScreen} />
    </div>
  );
};

export default Calculator;
