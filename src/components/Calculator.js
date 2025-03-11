import React, { useState } from "react";
import "../Calculator.css"; // Import CSS file

function Calculator() {
  const [num1, setNum1] = useState("");
  const [num2, setNum2] = useState("");
  const [result, setResult] = useState(null);

  const handleCalculate = (operation) => {
    const number1 = parseFloat(num1);
    const number2 = parseFloat(num2);

    if (isNaN(number1) || isNaN(number2)) {
      setResult("Invalid input");
      return;
    }

    let calcResult;
    switch (operation) {
      case "add":
        calcResult = number1 + number2;
        break;
      case "subtract":
        calcResult = number1 - number2;
        break;
      case "multiply":
        calcResult = number1 * number2;
        break;
      case "divide":
        calcResult =
          number2 !== 0 ? number1 / number2 : "Cannot divide by zero";
        break;
      default:
        calcResult = "Unknown operation";
    }
    setResult(calcResult);
  };

  return (
    <div className="calculator-container">
      <h2 className="calculator-title">Simple Calculator</h2>
      <div>
        <input
          type="text"
          placeholder="Enter first number"
          value={num1}
          onChange={(e) => setNum1(e.target.value)}
          className="calculator-input"
        />
        <input
          type="text"
          placeholder="Enter second number"
          value={num2}
          onChange={(e) => setNum2(e.target.value)}
          className="calculator-input"
        />
      </div>
      <div className="calculator-buttons">
        <button
          onClick={() => handleCalculate("add")}
          className="calculator-button"
        >
          Add
        </button>
        <button
          onClick={() => handleCalculate("subtract")}
          className="calculator-button"
        >
          Subtract
        </button>
        <button
          onClick={() => handleCalculate("multiply")}
          className="calculator-button"
        >
          Multiply
        </button>
        <button
          onClick={() => handleCalculate("divide")}
          className="calculator-button"
        >
          Divide
        </button>
      </div>
      {result !== null && (
        <h3 className="calculator-result">Result: {result}</h3>
      )}
    </div>
  );
}

export default Calculator;
