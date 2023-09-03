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

        // Assuming there's an HTML element with class "street"
        document.querySelector(".street").textContent = `Street: ${response[1].street}`;
        document.querySelector(".city").textContent = `City: ${response[1].location.city}`;
        document.querySelector(".zip").textContent = `Postal Code: ${response[1].zip}`;
        //document.querySelector(".constructionYear").textContent = `Construction Year: ${response[1].constructionYear}`;
        //document.querySelector(".description").textContent = `Description: ${response[1].description}`;
        
        // Set the image source
        document.querySelector(".card-image img").src = response[1].image;
    })
    .catch(error => {
        console.error('There was an error:', error);
    });

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

