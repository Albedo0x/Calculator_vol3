import React from "react";

const CalcScreen = function (props) {
  return (
    <div className="calc-screen">
      <div className="calc-screen__field">
        <p id="screen">{props.number}</p>
      </div>
    </div>
  );
};

export default CalcScreen;
