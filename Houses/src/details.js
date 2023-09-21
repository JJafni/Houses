
const options = {
    method: "GET",
    headers: {
      "X-API-Key": "KyCmdIJbepcjou0r6FSPsG9-MgU2ROav",
    },
  };
  

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
          <hr>
          <p class="property-price">€${property.price.toLocaleString("en-US")}</p>
  
          <div class="info-house">
          
          <div class="property-location">
              <p class="property-zip">${property.location.zip}</p>
              <p class="property-city">${property.location.city}</p>
          </div>
          <div class="property-price-container">
              <p class="property-size">${property.size} m2</p>
              <p class="property-construction-year">${property.constructionYear}</p>
          </div>
          <div class="property-details-container">
              <p class="property-bedrooms">${property.rooms.bedrooms} bedrooms</p>
              <p class="property-bathrooms">${property.rooms.bathrooms} bathrooms</p>
          </div>
          </div>
      </div>
  </div>
  `;
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });

    document.addEventListener("DOMContentLoaded", function() {
        const navbar = document.querySelector(".navbar");
        navbar.classList.add("slide-in");
    });
  
  
  
  
  