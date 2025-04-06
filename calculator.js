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

  const textInput = document.createElement("input");
  textInput.type = "text";
  textInput.name = "results";
  textInput.id = "Results";
  textInput.placeholder = "Results";
  textInput.readOnly = true;

  firstRow.append(textInput);

  return firstRow;
}

function app() {
  const root = document.getElementById("root");

  if (root) {
    root.append(heading());
  } else {
    console.error("Element with id 'root' not found.");
  }
}

document.addEventListener("DOMContentLoaded", app);
