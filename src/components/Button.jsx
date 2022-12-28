import React from "react";
import { ButtonType, ButtonCategory, calculation } from '../models';
import classnames from 'classnames';

let number1 = "0";
let number2 = "";
let operation = "";
let state = false;
let pullItem;

const Button = function ({ model, setScreen, onPush }) {
  function changeNumber() {
    onPush(model);

    if (model.type === ButtonType.Clear) {
      calcState("0", false);
    }

    if (model.type === ButtonType.MemorySave) {
      localStorage.setItem("savedNumber", number1);
    }

    if (model.type === ButtonType.MemoryRestore) {
      pullItem = localStorage.getItem("savedNumber");
      if (operation === "" && number2 === "") {
        number1 = pullItem;
        setScreen(number1);
      }
      if (operation !== "") {
        number2 = pullItem;
        setScreen(number2);
      }
    }

    if (model.category === ButtonCategory.Digit) {
      if (state === false) {
        if (operation === "" && number2 === "" && number1 === "0") {
          number1 = model.label;
          setScreen(number1);
          return;
        }
        if (operation === "" && number2 === "" && number1 !== "0") {
          number1 = number1 + model.label;
          setScreen(number1);
          return;
        } else {
          number2 = number2 + model.label;
          setScreen(number2);
          return;
        }
      } else {
        number1 = model.label;
        setScreen(number1);
        state = false;
        return;
      }
    }

    if (model.category === ButtonCategory.Operation) {
      operation = model.label;
      setScreen(model.label);
      if (number1 !== "" && state === true) {
        state = false;
      } else {
        return;
      }
    }

    if (model.type === ButtonType.Execute) {
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
    <div className={classnames('calc-btn', model.className)} onClick={changeNumber}>
      {model.label}
    </div>
  );
};

export default Button;
