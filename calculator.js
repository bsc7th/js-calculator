const STYLES = `
  .calculator-container {
    width: 320px;
    margin: 50px auto;
    border-radius: 15px;
    padding: 15px;
    background: #002b36;
    box-shadow: 4px 4px 15px rgba(0, 0, 0, 0.1), -4px -4px 15px rgba(255, 255, 255, 0.2);
  }

  .input-row {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
  }

  #result-display {
    width: 70%;
    height: 50px;
    font-size: 2rem;
    text-align: right;
    padding: 10px;
    border: none;
    border-radius: 10px;
    background-color: #073642;
    color: #839496;
    box-shadow: inset 4px 4px 6px rgba(0, 0, 0, 0.1), inset -4px -4px 6px rgba(255, 255, 255, 0.2);
  }

  .clear-button {
    width: 20%;
    background-color: #dc322f;
    color: white;
    font-weight: bold;
    border: none;
    border-radius: 10px;
    cursor: pointer;
  }

  .button-row {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-bottom: 10px;
  }

  .number-button, .operator-button, .equals-button {
    width: 22%;
    height: 70px;
    font-size: 1.6rem;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.1), -2px -2px 6px rgba(255, 255, 255, 0.2);
  }

  .number-button {
    background-color: #586e75;
    color: #fdf6e3;
  }

  .number-button:hover {
    background-color: #93a1a1;
  }

  .operator-button {
    background-color: #268bd2;
    color: #fdf6e3;
  }

  .operator-button:hover {
    background-color: #2aa198;
  }

  .equals-button {
    background-color: #859900;
    color: white;
    width: 100%;
  }

  .equals-button:hover {
    background-color: #6c71c4;
  }

  .button-row button:hover {
    opacity: 0.9;
  }
`;

function createElement(tag, { classes = [], attributes = {} } = {}) {
  const element = document.createElement(tag);
  if (classes.length) {
    element.classList.add(...classes);
  }
  Object.entries(attributes).forEach(([attr, value]) => {
    element.setAttribute(attr, value);
  });
  return element;
}

function createButton({
  label,
  onClickHandler,
  classes = [],
  attributes = {},
}) {
  const button = createElement("input", {
    classes: ["button", ...classes],
    attributes: {
      type: "button",
      value: label,
      ...attributes,
    },
  });

  button.addEventListener("click", onClickHandler);
  return button;
}

function safeEvaluate(expression) {
  const sanitizedExpression = expression.replace(/[^0-9+\-*/(). ]/g, "");
  try {
    return eval(sanitizedExpression);
  } catch (error) {
    return "Error";
  }
}

function createCalculator() {
  const calculatorContainer = createElement("div", {
    classes: ["calculator-container"],
  });

  const inputRow = createElement("div", { classes: ["input-row"] });
  const resultDisplay = createElement("input", {
    attributes: {
      type: "text",
      name: "results",
      id: "result-display",
      placeholder: "0",
      readOnly: true,
    },
  });

  const clearButton = createButton({
    label: "C",
    onClickHandler: () => {
      resultDisplay.value = "";
    },
    classes: ["clear-button"],
  });

  inputRow.appendChild(resultDisplay);
  inputRow.appendChild(clearButton);

  const buttonRow1 = createElement("div", { classes: ["button-row"] });
  const buttonRow2 = createElement("div", { classes: ["button-row"] });

  const numbers = Array.from({ length: 10 }, (_, i) => i);
  const operators = ["+", "-", "*", "/"];

  numbers.forEach((number) => {
    buttonRow1.appendChild(
      createButton({
        label: number,
        onClickHandler: () => {
          resultDisplay.value += number;
        },
        classes: ["number-button"],
      }),
    );
  });

  operators.forEach((operator) => {
    buttonRow2.appendChild(
      createButton({
        label: operator,
        onClickHandler: () => {
          resultDisplay.value += ` ${operator} `;
        },
        classes: ["operator-button"],
      }),
    );
  });

  const equalsButton = createButton({
    label: "=",
    onClickHandler: () => {
      resultDisplay.value = safeEvaluate(resultDisplay.value) || "Error";
    },
    classes: ["equals-button"],
  });
  buttonRow2.appendChild(equalsButton);

  calculatorContainer.appendChild(inputRow);
  calculatorContainer.appendChild(buttonRow1);
  calculatorContainer.appendChild(buttonRow2);

  if (!document.getElementById("calculator-styles")) {
    const styleSheet = document.createElement("style");
    styleSheet.id = "calculator-styles";
    styleSheet.type = "text/css";
    styleSheet.innerText = STYLES;
    document.head.appendChild(styleSheet);
  }

  return calculatorContainer;
}

function initializeApp() {
  const appRoot = document.getElementById("root");
  if (!appRoot) {
    console.error("Element with id 'root' not found.");
    return;
  }
  appRoot.appendChild(createCalculator());
}

document.addEventListener("DOMContentLoaded", initializeApp);
