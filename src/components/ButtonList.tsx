import React from "react";
import Button from "./Button";
import { layout as buttons } from "../models";

const ButtonList = function ({ onPush } : { onPush: (label: string) => void }) {
  return (
    <div className="calc-input">
      {buttons.map((button) =>
        <Button
          model={button}
          key={button.label}
          onPush={onPush}
        />
      )}
    </div>
  );
};

export default ButtonList;
