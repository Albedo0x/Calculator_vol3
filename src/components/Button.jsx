import React from "react";

let number1 = "0";
let number2 = "";
let operation = "";
let state = false;

const Button = function ({ screen, symbol, setScreen }) {
  function changeNumber() {
    if (symbol.classN === "calc-btn clear-all") {
      setScreen("0");
    }
    if (symbol.classN === "calc-btn btn-digit") {
      if (state === false) {
        if (operation === "" && number2 === "" && number1 === "0") {
          number1 = symbol.key;
          setScreen(number1);
          console.log(number1, operation, number2, state);
          return;
        }
        if (operation === "" && number2 === "" && number1 != "0") {
          number1 = number1 + symbol.key;
          console.log(number1, operation, number2, state);
          setScreen(number1);
          return;
        } else {
          number2 = number2 + symbol.key;
          console.log(number1, operation, number2, state);
          setScreen(number2);
        }
      } else {
        number1 = symbol.key;
        console.log(number1, operation, number2, state);
        setScreen(number1);
        state = false;
      }
    }

    if (symbol.classN === "calc-btn btn-oper") {
      if (number1 !== "" && state === true) {
        state = false;
        operation = symbol.key;
        console.log(number1, operation, number2, state);
        setScreen(operation);
      } else {
        operation = symbol.key;
        console.log(number1, operation, number2, state);
        setScreen(operation);
      }
    }

    if (symbol.classN === "calc-btn btn-result") {
      if (number2 === "" && operation !== "") {
        number1 = calculation(number1, number1, operation);
        console.log(number1, operation, number2, state);
        calcState(number1);
      }
      if (number2 === "" && operation === "") {
        console.log(number1, operation, number2, state);
        calcState(number1);
      } else {
        number1 = calculation(number1, number2, operation);
        console.log(number1, operation, number2, state);
        calcState(number1);
      }
    }
  }

  function calcState(info) {
    setScreen(info);
    state = true;
    number2 = "";
    operation = "";
  }

  function calculation(number1, number2, operation) {
    switch (operation) {
      case "+":
        number1 = +(+number1 + +number2).toFixed(3);
        return number1;
      case "-":
        number1 = +(+number1 - +number2).toFixed(3);
        return number1;
      case "*":
        number1 = +(+number1 * +number2).toFixed(3);
        return number1;
      case "÷":
        number1 = +(+number1 / +number2).toFixed(3);
        return number1;
      case "^":
        number1 = +((+number1) ** +number2).toFixed(3);
        return number1;
      default:
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
