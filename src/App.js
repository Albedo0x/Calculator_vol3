import React, { useState } from "react";
import Button from "./components/Button";
import "./styles/App.css";

function App() {
  let [number, setNumber] = useState("0");

  return (
    <div className="App">
      <div className="container">
        <div className="calc">
          <div className="calc-screen">
            <div className="calc-screen__field">
              <p id="screen">{number}</p>
            </div>
          </div>
          <div className="calc-input" id="main-input">
            <Button symbol={{ symbol: "MC", classN: "calc-btn btn-pull" }} />
            <Button symbol={{ symbol: "C", classN: "calc-btn clear-all" }} />
            <Button symbol={{ symbol: "MR", classN: "calc-btn btn-save" }} />
            <Button symbol={{ symbol: "÷", classN: "calc-btn btn-oper" }} />
            <Button symbol={{ symbol: 7, classN: "calc-btn btn-digit" }} />
            <Button symbol={{ symbol: 8, classN: "calc-btn btn-digit" }} />
            <Button symbol={{ symbol: 9, classN: "calc-btn btn-digit" }} />
            <Button symbol={{ symbol: "*", classN: "calc-btn btn-oper" }} />
            <Button symbol={{ symbol: 4, classN: "calc-btn btn-digit" }} />
            <Button symbol={{ symbol: 5, classN: "calc-btn btn-digit" }} />
            <Button symbol={{ symbol: 6, classN: "calc-btn btn-digit" }} />
            <Button symbol={{ symbol: "-", classN: "calc-btn btn-oper" }} />
            <Button symbol={{ symbol: 1, classN: "calc-btn btn-digit" }} />
            <Button symbol={{ symbol: 2, classN: "calc-btn btn-digit" }} />
            <Button symbol={{ symbol: 3, classN: "calc-btn btn-digit" }} />
            <Button symbol={{ symbol: "+", classN: "calc-btn btn-oper" }} />
            <Button symbol={{ symbol: "^", classN: "calc-btn btn-oper" }} />
            <Button symbol={{ symbol: 0, classN: "calc-btn btn-digit" }} />
            <Button symbol={{ symbol: ".", classN: "calc-btn btn-digit" }} />
            <Button symbol={{ symbol: "=", classN: "calc-btn btn-result" }} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
