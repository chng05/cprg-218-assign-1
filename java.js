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
// DOM added for best loading practices
document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM fully loaded and parsed. Setting up event listeners.");
  // Generate button
  document
    .getElementById("generateButton")
    .addEventListener("click", function () {
      console.log("Generate Palette button clicked.");
      generatePalette();
    });
  // Takes current json data linked from custom javascript
  function generatePalette() {
    console.log("Starting palette generation...");

    const json_data = {
      mode: "transformer",
      num_colors: 4,
      temperature: "1.0",
      num_results: 1,
      adjacency: [
        "0",
        "65",
        "45",
        "35",
        "65",
        "0",
        "35",
        "65",
        "45",
        "35",
        "0",
        "35",
        "35",
        "65",
        "35",
        "0",
      ],
      palette: ["-", "-", "-", "-"],
    };

    console.log("Sending data to API:", json_data);
    // Takes palette data from HueMint
    fetch("https://api.huemint.com/color", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(json_data),
    })
      .then((response) => {
        console.log("Received response from API:", response);
        return response.json();
      })
      .then((data) => {
        console.log("Parsed JSON data:", data);

        const palette = data.results[0].palette;
        console.log("Generated palette:", palette);

        const paletteContainer = document.getElementById("paletteContainer");

        // Clear the existing palette
        paletteContainer.innerHTML = "";
        console.log("Cleared existing palette.");

        // Display the new palette colorBox
        palette.forEach((color) => {
          const colorBox = document.createElement("div");
          colorBox.className = "colorBox";
          colorBox.style.backgroundColor = color;
          colorBox.textContent = color;
          paletteContainer.appendChild(colorBox);
          console.log("Added color to palette:", color);
        });

        console.log("Palette generation completed.");
      })
      // Catching any errors
      .catch((error) => {
        console.error("An error occurred while generating the palette:", error);
        alert("An error occurred while generating the palette.");
      });
  }
});