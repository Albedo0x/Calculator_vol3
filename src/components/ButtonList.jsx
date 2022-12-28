import React from "react";
import Button from "./Button";
import { layout as buttons } from "../models";

const ButtonList = function ({ setScreen, onPush }) {
  return (
    <div className="calc-input">
      {buttons.map((button) => {
        return <Button model={button} key={button.label} setScreen={setScreen} onPush={onPush}/>
      })}
    </div>
  );
};

export default ButtonList;
