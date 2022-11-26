import React, { useState } from "react";

const Button = function (props) {
  console.log(props);
  return <div className={props.symbol.classN}>{props.symbol.symbol}</div>;
};

export default Button;
