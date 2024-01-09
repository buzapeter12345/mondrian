let selectedColor = null;

function allowDrop(event) {
  event.preventDefault();
}

function drag(event) {
  event.dataTransfer.setData("color", event.target.className.split(" ")[1]);
}

function drop(event) {
  event.preventDefault();
  const color = event.dataTransfer.getData("color");

  console.log("Dropped color:", color); // Debugging line

  if (
    event.target.classList.contains("rectangle") &&
    !event.target.classList.contains(color)
  ) {
    console.log("Target rectangle:", event.target); // Debugging line

    event.target.classList.remove("yellow", "green", "blue", "red");

    event.target.classList.add(color);
  }
}

function createColorPalette() {
  const colors = ["yellow", "green", "blue", "red"];
  const colorPalette = document.getElementById("color-palette");

  colors.forEach((color) => {
    const colorOption = document.createElement("div");
    colorOption.className = `color-option ${color}`;
    colorOption.draggable = true;

    colorOption.addEventListener("dragstart", drag);

    colorPalette.appendChild(colorOption);
  });
}

function createGrid() {
  const gameContainer = document.getElementById("game-container");
  const indices = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

  for (let i = indices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [indices[i], indices[j]] = [indices[j], indices[i]];
  }

  for (let i = 0; i < 16; i++) {
    const rectangle = document.createElement("div");
    rectangle.className = "rectangle";

    if (indices.indexOf(i) < 2) {
      rectangle.style.backgroundColor = "black";
    }

    rectangle.addEventListener("dragover", allowDrop);
    rectangle.addEventListener("drop", drop);

    gameContainer.appendChild(rectangle);
  }
}

createColorPalette();

createGrid();
