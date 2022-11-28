import React, { useState } from "react";
import Calculator from "./components/Calculator";
import "./styles/App.css";

function App() {
  const [number, setNumber] = useState("0");
  const [number2, setNumber2] = useState("");
  const [operation, setOperation] = useState("");
  const [calcstate, setcalcState] = useState(false);
  const [screen, setScreen] = useState("0");
  const [buttons] = useState([
    { id: 1, key: "MC", classN: "calc-btn btn-pull" },
    { id: 2, key: "C", classN: "calc-btn clear-all" },
    { id: 3, key: "MR", classN: "calc-btn btn-save" },
    { id: 4, key: "÷", classN: "calc-btn btn-oper" },
    { id: 5, key: "7", classN: "calc-btn btn-digit" },
    { id: 6, key: "8", classN: "calc-btn btn-digit" },
    { id: 7, key: "9", classN: "calc-btn btn-digit" },
    { id: 8, key: "*", classN: "calc-btn btn-oper" },
    { id: 9, key: "4", classN: "calc-btn btn-digit" },
    { id: 10, key: "5", classN: "calc-btn btn-digit" },
    { id: 11, key: "6", classN: "calc-btn btn-digit" },
    { id: 12, key: "-", classN: "calc-btn btn-oper" },
    { id: 13, key: "1", classN: "calc-btn btn-digit" },
    { id: 14, key: "2", classN: "calc-btn btn-digit" },
    { id: 15, key: "3", classN: "calc-btn btn-digit" },
    { id: 16, key: "+", classN: "calc-btn btn-oper" },
    { id: 17, key: "^", classN: "calc-btn btn-oper" },
    { id: 18, key: "0", classN: "calc-btn btn-digit" },
    { id: 19, key: ".", classN: "calc-btn btn-digit" },
    { id: 20, key: "=", classN: "calc-btn btn-result" },
  ]);

  return (
    <div className="App">
      <Calculator buttons={buttons} screen={screen} setScreen={setScreen} />
    </div>
  );
}

export default App;
