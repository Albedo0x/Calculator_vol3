import React from "react";

const CalcScreen = function ({ screen }) {
  return (
    <div className="calc-screen">
      <div className="calc-screen__field">
        <p id="screen">{screen}</p>
      </div>
    </div>
  );
};

export default CalcScreen;
