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
  // const firstRow = createElement("div");
  // firstRow.classList.add("first-row");
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
