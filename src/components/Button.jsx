import React from "react";

const Button = function ({ symbol, action }) {
  return (
    <div className="calc-btn" onClick={action}>
      {symbol.key}
    </div>
  );
};

export default Button;
