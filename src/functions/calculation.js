function calculation(number1, number2, operation) {
  switch (operation) {
    case "+":
      number1 = +(+number1 + +number2).toFixed(3);
      return number1;
    case "-":
      number1 = +(+number1 - +number2).toFixed(3);
      return number1;
    case "*":
      number1 = +(+number1 * +number2).toFixed(3);
      return number1;
    case "÷":
      number1 = +(+number1 / +number2).toFixed(3);
      return number1;
    case "^":
      number1 = +((+number1) ** +number2).toFixed(3);
      return number1;
    default:
      return;
  }
}

export default calculation;
