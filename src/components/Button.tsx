import React from "react";
import classnames from 'classnames';

const Button = function ({ model, onPush } : { model: any, onPush: (label: string) => void }) {
  return (
    <div
      className={classnames('calc-btn', model.className)}
      onClick={() => onPush(model)}
    >
      {model.label}
    </div>
  );
};

export default Button;
