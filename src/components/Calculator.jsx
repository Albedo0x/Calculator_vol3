import React, { useState } from "react";
import ButtonList from "./ButtonList";
import CalcScreen from "./CalcScreen";
import calculation from "../functions/calculation.js";

const Calculator = function () {
  const buttons = [
    { key: "MC", func: getStorage },
    { key: "C", func: clearing },
    { key: "MR", func: setStorage },
    { key: "÷", func: setAction },
    { key: "7", func: setDigit },
    { key: "8", func: setDigit },
    { key: "9", func: setDigit },
    { key: "*", func: setAction },
    { key: "4", func: setDigit },
    { key: "5", func: setDigit },
    { key: "6", func: setDigit },
    { key: "-", func: setAction },
    { key: "1", func: setDigit },
    { key: "2", func: setDigit },
    { key: "3", func: setDigit },
    { key: "+", func: setAction },
    { key: "^", func: setAction },
    { key: "0", func: setDigit },
    { key: ".", func: setDigit },
    { key: "=", func: setResult },
  ];

  const [calcState, setCalcState] = useState({
    screen: "0",
    number1: "0",
    number2: "",
    operation: "",
    state: true,
  });

  function setStorage() {
    localStorage.setItem("savedNumber", calcState.number1);
  }

  function getStorage() {
    let pullItem = localStorage.getItem("savedNumber");
    calcState.operation
      ? setCalcState({ ...calcState, screen: pullItem, number2: pullItem })
      : setCalcState({ ...calcState, screen: pullItem, number1: pullItem });
  }

  function clearing() {
    calcToState("0", false);
  }

  function setAction(key) {
    setCalcState({ ...calcState, screen: key, operation: key, state: false });
  }

  function calcToState(info, status) {
    setCalcState({
      screen: info,
      number1: info,
      number2: "",
      operation: "",
      state: status,
    });
  }

  function setResult() {
    let result = calcState.number1;
    if (!calcState.number2 && calcState.operation) {
      result = calculation(
        calcState.number1,
        calcState.number1,
        calcState.operation
      );
    }
    if (calcState.number2) {
      result = calculation(
        calcState.number1,
        calcState.number2,
        calcState.operation
      );
    }
    calcToState(result, true);
  }

  function setDigit(key) {
    if (!calcState.state) {
      if (!calcState.operation && calcState.number1 === "0") {
        setCalcState((prev) => {
          return { ...prev, screen: key, number1: key };
        });
        return;
      }
      if (!calcState.operation && calcState.number1 !== "0") {
        setCalcState((prev) => {
          return {
            ...prev,
            screen: prev.screen + key,
            number1: prev.number1 + key,
          };
        });
        return;
      }
      if (calcState.operation && !calcState.number2) {
        setCalcState((prev) => {
          return { ...prev, screen: key, number2: key };
        });
        return;
      }
      if (calcState.operation && calcState.number2) {
        setCalcState((prev) => {
          return {
            ...prev,
            screen: prev.screen + key,
            number2: prev.number2 + key,
          };
        });
        return;
      }
    }
    if (calcState.state) {
      setCalcState((prev) => {
        return { ...prev, screen: key, number1: key, state: false };
      });
    }
  }

  return (
    <div className="calc">
      <CalcScreen screen={calcState.screen} />
      <ButtonList buttons={buttons} />
    </div>
  );
};

export default Calculator;
