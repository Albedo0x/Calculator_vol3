import React from "react";

const Button = function (button) {
  return <div className={button.symbol.classN}>{button.symbol.key}</div>;
};

export default Button;
