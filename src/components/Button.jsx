import React from "react";
import calculation from "../functions/calculation.js";

let number1 = "0";
let number2 = "";
let operation = "";
let state = false;

const Button = function ({ symbol, setScreen }) {
  function changeNumber() {
    if (symbol.classN === "calc-btn clear-all") {
      calcState("0", false);
    }
    if (symbol.classN === "calc-btn btn-digit") {
      if (state === false) {
        if (operation === "" && number2 === "" && number1 === "0") {
          number1 = symbol.key;
          setScreen(number1);
          return;
        }
        if (operation === "" && number2 === "" && number1 !== "0") {
          number1 = number1 + symbol.key;
          setScreen(number1);
          return;
        } else {
          number2 = number2 + symbol.key;
          setScreen(number2);
          return;
        }
      } else {
        number1 = symbol.key;
        setScreen(number1);
        state = false;
        return;
      }
    }

    if (symbol.classN === "calc-btn btn-oper") {
      operation = symbol.key;
      setScreen(symbol.key);
      if (number1 !== "" && state === true) {
        state = false;
      } else {
        return;
      }
    }

    if (symbol.classN === "calc-btn btn-result") {
      if (number2 === "" && operation !== "") {
        number1 = calculation(number1, number1, operation);
      }
      if (number2 === "" && operation === "") {
        return;
      } else {
        number1 = calculation(number1, number2, operation);
      }
      calcState(number1, true);
    }
  }

  function calcState(info, status) {
    setScreen(info);
    state = status;
    number2 = "";
    operation = "";

    if (status === false) {
      number1 = "0";
      return;
    } else {
      return;
    }
  }

  return (
    <div className={symbol.classN} onClick={changeNumber}>
      {symbol.key}
    </div>
  );
};

export default Button;
