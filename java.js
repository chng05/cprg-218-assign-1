// Accordion
const accordionItems = document.querySelectorAll(".accordion-item");

accordionItems.forEach((item) => {
  const header = item.querySelector(".accordion-header");
  const content = item.querySelector(".accordion-content");
  const icon = item.querySelector(".accordion-icon");

  header.addEventListener("click", () => {
    content.classList.toggle("active");
    icon.textContent = content.classList.contains("active") ? "-" : "+";
  });
});
// API
document
  .getElementById("generatePalette")
  .addEventListener("click", generatePalette);

function generatePalette() {
  fetch("http://colormind.io/api/", {
    method: "POST",
    body: JSON.stringify({
      model: "default",
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      displayPalette(data.result);
    })
    .catch((error) => {
      console.error("Error fetching the color palette:", error);
    });
}

function displayPalette(colors) {
  const paletteContainer = document.getElementById("paletteContainer");
  paletteContainer.innerHTML = ""; // Clear existing palette

  colors.forEach((color) => {
    const colorBox = document.createElement("div");
    colorBox.className = "color-box";
    const rgb = `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
    colorBox.style.backgroundColor = rgb;

    const hexCode = rgbToHex(color[0], color[1], color[2]);
    const hexCodeElement = document.createElement("div");
    hexCodeElement.className = "hex-code";
    hexCodeElement.innerText = hexCode;

    colorBox.appendChild(hexCodeElement);
    paletteContainer.appendChild(colorBox);
  });
}

function componentToHex(c) {
  const hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}
