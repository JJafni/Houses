// Select the form element
const houseForm = document.getElementById("houseForm");

// Select the list where added houses will be displayed
const streetList = document.getElementById("streetList");

// Listen for form submission
houseForm.addEventListener("submit", function (e) {
  e.preventDefault();

  // Get form input values
  const street = document.getElementById("street").value;
  const city = document.getElementById("city").value;
  const zip = document.getElementById("zip").value;
  const price = parseFloat(document.getElementById("price").value); // Convert to float
  const bedrooms = parseInt(document.getElementById("bedrooms").value); // Convert to integer
  const bathrooms = parseInt(document.getElementById("bathrooms").value); // Convert to integer

  // Create a new house object
  const newHouse = {
    street,
    city,
    zip,
    price,
    bedrooms,
    bathrooms,
  };

  // Add the new house to local storage
  saveHouse(newHouse);

  // Display the house in the list
  displayHouse(newHouse);

  // Clear the form
  houseForm.reset();
});

// Function to save a house to local storage
function saveHouse(house) {
  // Check if local storage is supported
  if (typeof Storage !== "undefined") {
    // Retrieve existing data from local storage or initialize an empty array
    let houses = JSON.parse(localStorage.getItem("houses")) || [];

    // Add the new house to the array
    houses.push(house);

    // Save the updated array back to local storage
    localStorage.setItem("houses", JSON.stringify(houses));
  }
}

// Function to display houses from local storage
function displayHousesFromLocalStorage() {
  // Check if local storage is supported
  if (typeof Storage !== "undefined") {
    // Retrieve stored houses from local storage
    const houses = JSON.parse(localStorage.getItem("houses"));

    // Display each house
    if (houses) {
      houses.forEach(displayHouse);
    }
  }
}

// Display houses from local storage when the page loads
window.addEventListener("load", displayHousesFromLocalStorage);

// Function to display a house item in the list
function displayHouse(house) {
  const listItem = document.createElement("p");
  listItem.innerHTML = `
    ${house.street}, ${house.city}, ${house.zip}, Price: €${house.price}, Bedrooms: ${house.bedrooms}, Bathrooms: ${house.bathrooms}
  `;
  streetList.appendChild(listItem);
}
