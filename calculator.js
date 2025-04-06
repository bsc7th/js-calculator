function heading() {
  const heroContainer = document.createElement("div");
  const heroWrapper = document.createElement("div");

  const title = document.createElement("h1");
  title.textContent = "Calculator";

  heroContainer.append(heroWrapper);
  heroWrapper.append(title);

  return heroContainer;
}

function calculator() {
  const firstRow = document.createElement("div");
  firstRow.classList.add("first-row");

  const textOutput = document.createElement("input");
  textOutput.type = "text";
  textOutput.name = "results";
  textOutput.id = "Results";
  textOutput.placeholder = "Results";
  textOutput.readOnly = true;

  const buttonInput = document.createElement("input");
  buttonInput.type = "button";
  buttonInput.value = "C";
  buttonInput.onclick = function () {
    result.value = "";
  };
  buttonInput.id = "clear-button";

  firstRow.append(textOutput, buttonInput);

  return firstRow;
}

function app() {
  const root = document.getElementById("root");

  if (root) {
    root.append(heading(), calculator());
  } else {
    console.error("Element with id 'root' not found.");
  }
}

document.addEventListener("DOMContentLoaded", app);
