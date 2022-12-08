import React from "react";
import Button from "./Button";

const ButtonList = function ({ buttons }) {
  return (
    <div className="calc-input">
      {buttons.map((button) => (
        <Button
          symbol={button}
          key={button.key}
          action={() => button.func(button.key)}
        />
      ))}
    </div>
  );
};

export default ButtonList;
