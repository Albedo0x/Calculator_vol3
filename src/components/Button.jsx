import React from "react";
import classnames from 'classnames';

const Button = function ({ model, onPush }) {
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
