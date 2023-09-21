const options = {
  method: "GET",
  headers: {
    "X-API-Key": "KyCmdIJbepcjou0r6FSPsG9-MgU2ROav",
  },
};

fetch("https://api.intern.d-tt.nl/api/houses", options)
  .then((response) => response.json())
  .then((response) => {
    // Assuming response is an array of property objects
    console.log(response);

    // Function to generate cards from the API response data
    function generateCards(data) {
      const cardContainer = document.getElementById("card-container");

      // Inside the generateCards function

// Function to set the background image and adjust its brightness based on screen width
function setCardBackgroundImage(property, card) {
  const mediaQuery1360px = window.matchMedia("(max-width: 1360px)");

  function updateCardBackground() {
      if (mediaQuery1360px.matches) {
          // Apply the background image for screens with a minimum width of 1360px
          card.style.backgroundImage = `url(${property.image})`;
          card.style.backgroundSize = "cover"; // Optional: To ensure the image covers the entire card
      } else {
          // Remove the background image for screens smaller than 1360px
          card.style.backgroundImage = "none";
      }
  }

  // Initial call to set the background based on the initial screen width
  updateCardBackground();

  // Add an event listener to update the background when the window is resized
  mediaQuery1360px.addListener(updateCardBackground);
}

// Inside the generateCards function
data.forEach((property, index) => {
  const card = document.createElement("a");
  card.className = "card";
  card.href = `detail.html?propertyIndex=${index}`;
  
  // Call the function to set the background image and adjust its brightness
  setCardBackgroundImage(property, card);

  card.innerHTML = `
  <div class="card-content">
      <p class="street">${property.location.street}</p>
      <p class="price">€${property.price.toLocaleString("en-US")}</p>
  </div>
  <div class="details-container">
      <p class="city">${property.location.city}</p>
      <p class="zip">${property.location.zip}</p>
      <p class="bedrooms">bedrooms: ${property.rooms.bedrooms}</p>
      <p class="bathrooms">bathrooms: ${property.rooms.bathrooms}</p>
  </div>
  `;


  cardContainer.appendChild(card);
});




      // Store the original card elements for filtering
      const originalCards = [...cardContainer.querySelectorAll(".card")];

      // Function to filter and display cards based on user input
      function filterCards(searchTerm) {
        // Clear the current card display
        cardContainer.innerHTML = "";

        // Filter the cards based on the user's input
        const matchingCards = originalCards.filter((card) => {
          const street = card.querySelector(".street").textContent.toLowerCase();
          return street.includes(searchTerm.toLowerCase());
        });

        // Display matching cards or "not found" card
        if (matchingCards.length === 0) {
          displayNotFoundCard();
        } else {
          matchingCards.forEach((card) => {
            cardContainer.appendChild(card);
          });
        }
      }

      // Function to display "not found" card
      function displayNotFoundCard() {
        const notFoundCard = document.createElement("div");
        notFoundCard.className = "not-found-card";

        notFoundCard.style.position = "fixed";
        notFoundCard.style.top = "50%";
        notFoundCard.style.left = "50%";
        notFoundCard.style.transform = "translate(-50%, -50%)";
        notFoundCard.style.textAlign = "center";

        notFoundCard.innerHTML = `
          <div class="not-found-image">
            <img class="image-not-found" src="https://www.freepnglogos.com/uploads/house-png/house-png-commonwealth-magazine-18.png" alt="Not Found Image">
          </div>
          <div class="not-found-message">
            <p>No result found.</p>
            
            <p>Try searching for something else.</p>
          </div>
        `;
        cardContainer.appendChild(notFoundCard);
      }

      const searchBox = document.getElementById("search-box");
      searchBox.addEventListener("input", () => {
        const searchTerm = searchBox.value.trim();
        filterCards(searchTerm);
      });
    }

    // Call the function to generate the cards with API response data
    generateCards(response);
  })
  .catch((error) => {
    console.error("Error fetching data:", error);
  });

  document.addEventListener("DOMContentLoaded", function() {
    const navbar = document.querySelector(".navbar");
    navbar.classList.add("slide-in");
});

document.addEventListener("DOMContentLoaded", function() {
  const searchbar = document.querySelector(".search-bar");
  searchbar.classList.add("expanded");
});




