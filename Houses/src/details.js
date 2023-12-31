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
      
      <div class="card-container-2">
      <!-- Card image and property details -->
      <div class="card-image-details">
        <div class="card-image-2">
          <img src="${property.image}" alt="Card Image">
        </div>
        <!-- Card details -->
        <div class="card-2">
          <div class="card-content-2">
            <p class="property-street">${property.location.street}</p>
            <hr>
            <p class="property-price">€${property.price.toLocaleString("en-US")}</p>
            <!-- Property details -->
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
                <p class="property-bedrooms">bedrooms: ${property.rooms.bedrooms} </p>
                <p class="property-bathrooms">bathrooms: ${property.rooms.bathrooms} </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Card description -->
      <div class="card-description">
        ${property.description}
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
  
  
  
  
  