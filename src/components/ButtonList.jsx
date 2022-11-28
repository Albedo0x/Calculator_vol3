import React from "react";
import Button from "./Button";

const ButtonList = function ({ buttons, screen, setScreen }) {
  return (
    <div className="calc-input">
      {buttons.map((button) => (
        <Button
          screen={screen}
          symbol={button}
          key={button.id}
          setScreen={setScreen}
        />
      ))}
    </div>
  );
};

export default ButtonList;
