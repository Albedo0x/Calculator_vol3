import React, { useState } from "react";
import ButtonList from "./ButtonList";
import CalcScreen from "./CalcScreen";

const Calculator = function () {
  const [screen, setScreen] = useState("0");
  return (
    <div className="calc">
      <CalcScreen screen={screen} />
      <ButtonList setScreen={setScreen} />
    </div>
  );
};

export default Calculator;
