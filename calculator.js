function hero() {
  const heroContainer = document.createElement("div");
  const heroWrapper = document.createElement("div");

  const title = document.createElement("h1");
  title.textContent = "Calculator";
  //
  // heroContainer.append(heroWrapper);
  // heroWrapper.append(title);

  return heroContainer;
}

function app() {
  const root = document.getElementById("root");

  if (root) {
    root.append(hero());
  } else {
    console.error("Element with id 'root' not found.");
  }
}

document.addEventListener("DOMContentLoaded", app);
