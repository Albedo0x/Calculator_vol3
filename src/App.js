import React from "react";
import "./styles/App.css";

function App() {
  return (
    <div className="App">
      <div className="container">
        <div className="calculator">
          <div className="calculator-screen">
            <div className="calculator-screen__field">
              <p id="screen"></p>
            </div>
          </div>
          <div className="calculator-input" id="main-input">
            <div className="calculator-btn btn-pull">MC</div>
            <div className="calculator-btn btn-clear-all">C</div>
            <div className="calculator-btn btn-save">MR</div>
            <div className="calculator-btn btn-operation">÷</div>
            <div className="calculator-btn btn-digit">7</div>
            <div className="calculator-btn btn-digit">8</div>
            <div className="calculator-btn btn-digit">9</div>
            <div className="calculator-btn btn-operation">*</div>
            <div className="calculator-btn btn-digit">4</div>
            <div className="calculator-btn btn-digit">5</div>
            <div className="calculator-btn btn-digit">6</div>
            <div className="calculator-btn btn-operation">-</div>
            <div className="calculator-btn btn-digit">1</div>
            <div className="calculator-btn btn-digit">2</div>
            <div className="calculator-btn btn-digit">3</div>
            <div className="calculator-btn btn-operation">+</div>
            <div className="calculator-btn btn-operation">^</div>
            <div className="calculator-btn btn-digit">0</div>
            <div className="calculator-btn btn-digit">.</div>
            <div className="calculator-btn btn-result">=</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
