// Utility function to create HTML elements with classes and attributes
function createElement(tag, { classes = [], attributes = {} } = {}) {
  const element = document.createElement(tag);

  // Add classes to the element
  if (classes.length) {
    element.classList.add(...classes);
  }

  // Set attributes to the element
  Object.entries(attributes).forEach(([attr, value]) => {
    element.setAttribute(attr, value);
  });

  return element;
}

// Function to create a button
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

  // Add event listener to the button
  button.addEventListener("click", onClickHandler);
  return button;
}

// Function to create the calculator UI
function createCalculator() {
  const calculatorContainer = createElement("div", {
    classes: ["calculator-container"],
  });

  // Create input row and display elements
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

  // Create clear button
  const clearButton = createButton({
    label: "C",
    onClickHandler: () => {
      resultDisplay.value = "";
    },
    classes: ["clear-button"],
  });

  inputRow.appendChild(resultDisplay);
  inputRow.appendChild(clearButton);

  // Create number buttons
  const buttonRow1 = createElement("div", { classes: ["button-row"] });
  for (let number = 0; number <= 9; number++) {
    buttonRow1.appendChild(
      createButton({
        label: number,
        onClickHandler: () => {
          resultDisplay.value += number;
        },
        classes: ["number-button"],
      }),
    );
  }

  // Create operator buttons
  const operators = ["+", "-", "*", "/"];
  const buttonRow2 = createElement("div", { classes: ["button-row"] });
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

  // Create equals button
  const equalsButton = createButton({
    label: "=",
    onClickHandler: () => {
      try {
        resultDisplay.value =
          new Function("return " + resultDisplay.value)() || "Error";
      } catch (error) {
        resultDisplay.value = "Error";
      }
    },
    classes: ["equals-button"],
  });
  buttonRow2.appendChild(equalsButton);

  // Append rows to the main container
  calculatorContainer.appendChild(inputRow);
  calculatorContainer.appendChild(buttonRow1);
  calculatorContainer.appendChild(buttonRow2);

  // Apply styles to the calculator
  applyStyles(calculatorContainer);

  return calculatorContainer;
}

// Function to apply styles to the calculator (inline JavaScript styles)
function applyStyles(calculatorContainer) {
  const styles = `
    .calculator-container {
      width: 320px;
      margin: 50px auto;
      border-radius: 15px;
      padding: 15px;
      background: #002b36; /* Base03 */
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
      background-color: #073642; /* Base02 */
      color: #839496; /* Base0 */
      box-shadow: inset 4px 4px 6px rgba(0, 0, 0, 0.1), inset -4px -4px 6px rgba(255, 255, 255, 0.2);
    }

    .clear-button {
      width: 20%;
      background-color: #dc322f; /* Red */
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
      background-color: #586e75; /* Base01 */
      color: #fdf6e3; /* Base3 */
    }

    .number-button:hover {
      background-color: #93a1a1; /* Base1 */
    }

    .operator-button {
      background-color: #268bd2; /* Blue */
      color: #fdf6e3; /* Base3 */
    }

    .operator-button:hover {
      background-color: #2aa198; /* Cyan */
    }

    .equals-button {
      background-color: #859900; /* Green */
      color: white;
      width: 100%;
    }

    .equals-button:hover {
      background-color: #6c71c4; /* Violet */
    }

    .button-row button:hover {
      opacity: 0.9;
    }
  `;

  // Injecting styles into the head of the document
  const styleSheet = document.createElement("style");
  styleSheet.type = "text/css";
  styleSheet.innerText = styles;
  document.head.appendChild(styleSheet);
}

// Initialize the app when the DOM is fully loaded
function initializeApp() {
  const appRoot = document.getElementById("root");
  if (!appRoot) {
    console.error("Element with id 'root' not found.");
    return;
  }
  appRoot.appendChild(createCalculator());
}

document.addEventListener("DOMContentLoaded", initializeApp);
