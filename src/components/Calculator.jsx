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

  const [screen, setScreen] = useState("0");
  const [operation, setOperation] = useState("");
  const [state, setState] = useState(true);
  const [number1, setNumber1] = useState("0");
  const [number2, setNumber2] = useState("");

  function setStorage() {
    localStorage.setItem("savedNumber", number1);
  }

  function getStorage() {
    let pullItem = localStorage.getItem("savedNumber");
    setScreen(pullItem);
    operation ? setNumber2(pullItem) : setNumber1(pullItem);
  }

  function clearing() {
    calcState("0", false);
  }

  function setAction(key) {
    setOperation(key);
    setScreen(key);
    if (state) {
      setState(false);
    }
  }

  function calcState(info, status) {
    setNumber1(info);
    setScreen(info);
    setState(status);
    setNumber2("");
    setOperation("");

    if (!status) {
      setNumber1("0");
    }
  }

  function setResult() {
    let result = number1;
    if (!number2 && operation) {
      result = calculation(number1, number1, operation);
    }
    if (number2) {
      result = calculation(number1, number2, operation);
    }
    calcState(result, true);
  }

  function setDigit(key) {
    if (!state) {
      if (!operation && number1 === "0") {
        setNumber1(key);
        setScreen(key);
        return;
      }
      if (!operation && number1 !== "0") {
        setNumber1((prev) => prev + key);
        setScreen((prev) => prev + key);
        return;
      }
      if (operation && !number2) {
        setNumber2((prev) => prev + key);
        setScreen(key);
        return;
      }
      if (operation && number2) {
        setNumber2((prev) => prev + key);
        setScreen((prev) => prev + key);
        return;
      }
    }
    if (state) {
      setNumber1(key);
      setScreen(key);
      setState(false);
    }
  }

  return (
    <div className="calc">
      <CalcScreen screen={screen} />
      <ButtonList buttons={buttons} />
    </div>
  );
};

export default Calculator;
