const options = {
    method: 'GET',
    headers: {
        'X-API-Key': 'KyCmdIJbepcjou0r6FSPsG9-MgU2ROav',
    }
};

fetch('https://api.intern.d-tt.nl/api/houses', options)
    .then(response => response.json())
    .then(response => {
        // Assuming response is an array of property objects
        console.log(response);

        // Function to generate cards from the API response data
        function generateCards(data) {
            const cardContainer = document.getElementById("card-container");

            data.forEach((property) => {
                const card = document.createElement("div");
                card.className = "card";

                // Set the content for each card based on the property data
                card.innerHTML = `
                    <div class="card-image">
                        <img src="${property.image}" alt="Card Image" style="width: 200px;">
                    </div>
                    <div class="card-content">
                        <p class="street">${property.location.street}</p>
                        <p class="price">€${property.price.toLocaleString('en-US')}</p>
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
        }

        // Call the function to generate the cards with API response data
        generateCards(response);
    })
    .catch(error => {
        console.error("Error fetching data:", error);
    });



    

  // Get references to the form and house list
const houseForm = document.getElementById('house-form');
const streetList = document.getElementById('street-list');
const priceList = document.getElementById('price-list');
const cityList = document.getElementById('city-list');
const zipList = document.getElementById('zip-list');
const bedroomsList = document.getElementById('bedrooms-list');
const bathroomsList = document.getElementById('bathrooms-list');









// Listen for form submission
houseForm.addEventListener('submit', function (e) {
    e.preventDefault();

    // Get form input values
    const street = document.getElementById('street').value;
    const city = document.getElementById('city').value;
    const zip = document.getElementById('zip').value;
    const price = document.getElementById('price').value;
    const bedrooms = document.getElementById('bedrooms').value;
    const bathrooms = document.getElementById('bathrooms').value;

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
    if (typeof Storage !== 'undefined') {
        // Retrieve existing data from local storage or initialize an empty array
        let houses = JSON.parse(localStorage.getItem('houses')) || [];

        // Add the new house to the array
        houses.push(house);

        // Save the updated array back to local storage
        localStorage.setItem('houses', JSON.stringify(houses));
    }
}

// Function to display houses from local storage
function displayHousesFromLocalStorage() {
    // Check if local storage is supported
    if (typeof Storage !== 'undefined') {
        // Retrieve stored houses from local storage
        const houses = JSON.parse(localStorage.getItem('houses'));

        // Display each house
        if (houses) {
            houses.forEach(displayHouse);
        }
    }
}

// Display houses from local storage when the page loads
window.addEventListener('load', displayHousesFromLocalStorage);





// Function to display a house item in the list
function displayHouse(house) {
    const listItem = document.createElement('p');
    listItem.innerHTML = `
        ${house.street}
        ${house.city}
        ${house.zip}
        ${house.price}
      
    `;
    streetList.appendChild(listItem);
    
}


// Add this script if you want to highlight the active link using JavaScript
document.addEventListener("DOMContentLoaded", function() {
    const navLinks = document.querySelectorAll(".nav-link");

    navLinks.forEach(link => {
        link.addEventListener("click", function() {
            navLinks.forEach(navLink => navLink.classList.remove("active"));
            this.classList.add("active");
        });
    });
});

const filterButtons = document.querySelectorAll('.filter-button');
const filterItems = document.querySelectorAll('.filter-item');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove 'active' class from all filter buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));

        // Add 'active' class to the clicked button
        button.classList.add('active');

        // Get the filter category from the 'data-filter' attribute
        const filterCategory = button.getAttribute('data-filter');

        // Show/hide filter items based on the filter category
        filterItems.forEach(item => {
            const itemCategory = item.getAttribute('data-category');
            if (itemCategory === filterCategory) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    });
});

