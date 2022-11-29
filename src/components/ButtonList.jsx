import React from "react";
import Button from "./Button";
import buttons from "../functions/buttonscontext";

const ButtonList = function ({ setScreen }) {
  return (
    <div className="calc-input">
      {buttons.map((button) => (
        <Button symbol={button} key={button.id} setScreen={setScreen} />
      ))}
    </div>
  );
};

export default ButtonList;
