const options = {
    method: 'GET',
    headers: {
        'X-API-Key': 'KyCmdIJbepcjou0r6FSPsG9-MgU2ROav',
    }
};

fetch('https://api.intern.d-tt.nl/api/houses', options)
    .then(response => response.json())
    .then(response => {
        console.log(response);
        const price = response[1].price;

        const formattedPrice = price.toLocaleString('en-US');
        // Assuming there's an HTML element with class "street"
        document.querySelector(".street").textContent = `${response[1].location.street}`;
        document.querySelector(".city").textContent = `${response[1].location.city}`;
        document.querySelector(".zip").textContent = `${response[1].location.zip}`;
        document.querySelector(".price").textContent = `€${response[1].price}`;
        document.querySelector(".price").textContent = `€${formattedPrice}`;
        document.querySelector(".bedrooms").textContent = `${response[1].rooms.bedrooms} bedrooms`;
        document.querySelector(".bathrooms").textContent = `${response[1].rooms.bathrooms} bathrooms`;
        //document.querySelector(".constructionYear").textContent = `Construction Year: ${response[1].constructionYear}`;
        //document.querySelector(".description").textContent = `Description: ${response[1].description}`;
        
        // Set the image source
        document.querySelector(".card-image img").src = response[1].image;
    })
    .catch(error => {
        console.error('There was an error:', error);
    });

  // Get references to the form and house list
const houseForm = document.getElementById('house-form');
const houseList = document.getElementById('house-list');

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
        ${house.street}<br>
      
    `;
    houseList.appendChild(listItem);
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

