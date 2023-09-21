


// app.js

// Function to handle form submission for adding houses
function handleFormSubmission(event) {
  event.preventDefault(); // Prevent the form from submitting normally

  // Get form values
  const street = document.getElementById("street").value;
  const city = document.getElementById("city").value;
  const zip = document.getElementById("zip").value;
  const price = parseFloat(document.getElementById("price").value);
  const bedrooms = parseInt(document.getElementById("bedrooms").value);
  const bathrooms = parseInt(document.getElementById("bathrooms").value);

  // Create a new house object with the form values
  const newHouse = {
    location: {
      street: street,
      city: city,
      zip: zip,
    },
    price: price,
    rooms: {
      bedrooms: bedrooms,
      bathrooms: bathrooms,
    },
    // You may want to add an image property or other details here
  };

  // Add the new house to the existing response array
  response.push(newHouse);

  // Regenerate the cards to include the new house
  generateCards(response);

  // Clear the form fields
  event.target.reset();
}

document.addEventListener("DOMContentLoaded", function () {
  const addHouseForm = document.getElementById("add-house-form");

  addHouseForm.addEventListener("submit", handleFormSubmission);
});
