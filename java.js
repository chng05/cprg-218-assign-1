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
// document.getElementById("generatePalette").addEventListener("click", () => {
//   console.log("Generate palette button clicked");
//   generatePalette();
// });

// function generatePalette() {
//   console.log("Starting generatePalette function");

//   fetch("https://colormind.io/api/", {
//     method: "POST",
//     body: JSON.stringify({
//       model: "default",
//     }),
//   })
//     .then((response) => {
//       console.log("Received response from API:", response);
//       return response.json();
//     })
//     .then((data) => {
//       console.log("API data received:", data);
//       displayPalette(data.result);
//     })
//     .catch((error) => {
//       console.error("Error fetching the color palette:", error);
//     });

//   console.log("Ending generatePalette function");
// }

// function displayPalette(colors) {
//   console.log("Starting displayPalette function with colors:", colors);
//   const paletteContainer = document.getElementById("paletteContainer");
//   paletteContainer.innerHTML = "";

//   // Clear existing palette

//   colors.forEach((color) => {
//     const colorBox = document.createElement("div");
//     colorBox.className = "color-box";
//     const rgb = `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
//     colorBox.style.backgroundColor = rgb;

//     const hexCode = rgbToHex(color[0], color[1], color[2]);
//     const hexCodeElement = document.createElement("div");
//     hexCodeElement.className = "hex-code";
//     hexCodeElement.innerText = hexCode;

//     colorBox.appendChild(hexCodeElement);
//     paletteContainer.appendChild(colorBox);
//   });

//   console.log("Ending displayPalette function");
// }

// function componentToHex(c) {
//   console.log("Converting component to hex:", c);
//   const hex = c.toString(16);
//   return hex.length == 1 ? "0" + hex : hex;
// }

// function rgbToHex(r, g, b) {
//   console.log("Converting RGB to hex:", r, g, b);
//   return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
// }

document.getElementById("generatePalette").addEventListener("click", () => {
  console.log("Generate palette button clicked");
  generatePalette();
});

function generatePalette() {
  console.log("Starting generatePalette function");

  fetch("https://colormind.io/api/", {
    // Changed to https
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "default",
    }),
  })
    .then((response) => {
      console.log("Received response from API:", response);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      console.log("API data received:", data);
      displayPalette(data.result);
    })
    .catch((error) => {
      console.error("Error fetching the color palette:", error);
    });

  console.log("Ending generatePalette function");
}

function displayPalette(colors) {
  console.log("Starting displayPalette function with colors:", colors);
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

  console.log("Ending displayPalette function");
}

function componentToHex(c) {
  console.log("Converting component to hex:", c);
  const hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
  console.log("Converting RGB to hex:", r, g, b);
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}
