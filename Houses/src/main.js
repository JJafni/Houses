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
      data.forEach((property, index) => {
        const card = document.createElement("a");
        card.className = "card";
        card.href = `detail.html?propertyIndex=${index}`; // Set the href attribute for the entire card

        card.innerHTML = `
        <div class="card-image">
            <img src="${property.image}" alt="Card Image" style="width: 200px;">
        </div>
        <div class="card-content">
            <p class="street">${property.location.street}</p>
            <p class="price">€${property.price.toLocaleString("en-US")}</p>
        </div>
        <div class="details-container">
            <p class="city">${property.location.city}</p>
            <p class="zip">${property.location.zip}</p>
            <p class="bedrooms">${property.rooms.bedrooms} bedrooms</p>
            <p class="bathrooms">${property.rooms.bathrooms} bathrooms</p>
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
            <img src="path_to_not_found_image.jpg" alt="Not Found Image">
          </div>
          <div class="not-found-message">
            <p>No result found.</p>
            
            <p>Try searching for something else.</p>
          </div>
        `;
        cardContainer.appendChild(notFoundCard);
      }

      // Add an event listener to the search input field
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







// Inside your JavaScript code

let sortByPriceAscending = true; // Track the current sorting order for price
let sortBySizeAscending = true; // Track the current sorting order for size

// Add an event listener to the filter buttons
const filterButtons = document.querySelectorAll(".filter-button");
filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filterCriteria = button.getAttribute("data-filter");

    if (filterCriteria === "price") {
      // Toggle the sorting order for price
      sortByPriceAscending = !sortByPriceAscending;

      // Update the button text to indicate the sorting order
      if (sortByPriceAscending) {
        button.textContent = "Sort by Price (Lowest)";
      } else {
        button.textContent = "Sort by Price (Highest)";
      }
    } else if (filterCriteria === "size") {
      // Toggle the sorting order for size
      sortBySizeAscending = !sortBySizeAscending;

      // Update the button text to indicate the sorting order
      if (sortBySizeAscending) {
        button.textContent = "Sort by Size (Lowest)";
      } else {
        button.textContent = "Sort by Size (Highest)";
      }
    }

    sortCards(filterCriteria);
  });
});

// Function to sort the cards based on the selected criteria
function sortCards(criteria) {
  const cardContainer = document.getElementById("card-container");
  const cards = Array.from(cardContainer.querySelectorAll(".card"));

  // Sort the cards based on the criteria
  cards.sort((a, b) => {
    const cardAValue = parseInt(a.querySelector(`.card-content .${criteria}`).textContent.replace(/\D/g, ""), 10);
    const cardBValue = parseInt(b.querySelector(`.card-content .${criteria}`).textContent.replace(/\D/g, ""), 10);

    // Compare the card values based on the criteria
    if (criteria === "price") {
      if (sortByPriceAscending) {
        return cardAValue - cardBValue; // Sort by ascending price
      } else {
        return cardBValue - cardAValue; // Sort by descending price
      }
    } else if (criteria === "size") {
      if (sortBySizeAscending) {
        return cardAValue - cardBValue; // Sort by ascending size
      } else {
        return cardBValue - cardAValue; // Sort by descending size
      }
    }
  });

  // Clear the card container
  cardContainer.innerHTML = "";

  // Append the sorted cards back to the container
  cards.forEach((card) => {
    cardContainer.appendChild(card);
  });
}

// Initial loading of cards
fetch("https://api.intern.d-tt.nl/api/houses", options)
  .then((response) => response.json())
  .then((response) => {
    generateCards(response);

    // Call this function to initially display cards based on the default criteria
    sortCards("price"); // Sort by price initially
  })
  .catch((error) => {
    console.error("Error fetching data:", error);
  });












// Function to get the value of a query parameter by its name
function getQueryParam(parameterName) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get(parameterName);
}

// Retrieve the property index from the query parameter
const propertyIndex = getQueryParam("propertyIndex");

// Fetch the specific card's data based on the propertyIndex
fetch("https://api.intern.d-tt.nl/api/houses", options)
  .then((response) => response.json())
  .then((data) => {
    const property = data[propertyIndex];

    // Display the card's details on the page
    const detailContainer = document.getElementById("detail-container");
    detailContainer.innerHTML = `
    
    <div class="card-container">
    <!-- Card containing property image and description -->
    <div class="card-image-2">
        <img src="${property.image}" alt="Card Image">
    </div>
    <div class="card-description">
        ${property.description}
    </div>


<!-- Card containing property details -->
<div class="card-2">
    <div class="card-content">
        <p class="property-street">${property.location.street}</p>
        <div class="property-location">
            <p class="property-zip">${property.location.zip}</p>
            <p class="property-city">${property.location.city}</p>
        </div>
        <div class="property-price-container">
            <p class="property-price">€${property.price.toLocaleString("en-US")}</p>
            <p class="property-size">${property.size} m2</p>
            <p class="property-construction-year">${property.constructionYear}</p>
        </div>
        <div class="property-details-container">
            <p class="property-bedrooms">${property.rooms.bedrooms} bedrooms</p>
            <p class="property-bathrooms">${property.rooms.bathrooms} bathrooms</p>
        </div>
    </div>
</div>





`;
  })
  .catch((error) => {
    console.error("Error fetching data:", error);
  });

// Listen for form submission
houseForm.addEventListener("submit", function (e) {
  e.preventDefault();

  // Get form input values
  const street = document.getElementById("street").value;
  const city = document.getElementById("city").value;
  const zip = document.getElementById("zip").value;
  const price = document.getElementById("price").value;
  const bedrooms = document.getElementById("bedrooms").value;
  const bathrooms = document.getElementById("bathrooms").value;

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

  // Display the house
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
        ${house.street}
        ${house.city}
        ${house.zip}
        ${house.price}
      
    `;
  streetList.appendChild(listItem);
}

// Add this script if you want to highlight the active link using JavaScript
document.addEventListener("DOMContentLoaded", function () {
  const navLinks = document.querySelectorAll(".nav-link");

  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      navLinks.forEach((navLink) => navLink.classList.remove("active"));
      this.classList.add("active");
    });
  });
});

