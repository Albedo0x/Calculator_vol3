import React from "react";
import ButtonList from "./ButtonList";
import CalcScreen from "./CalcScreen";

const Calculator = function (props) {
  return (
    <div className="calc">
      <CalcScreen number={props.number} />
      <ButtonList buttons={props.buttons} />
    </div>
  );
};

export default Calculator;
