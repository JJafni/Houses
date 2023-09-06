// Inside detail.html

// Function to extract propertyIndex from the URL
function getPropertyIndexFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    const propertyIndex = urlParams.get("propertyIndex");
    return parseInt(propertyIndex, 10); // Parse as an integer
}

// Function to fetch property details based on propertyIndex (replace with your data source)
function fetchPropertyDetails(propertyIndex) {
    // Replace this with your actual data source (e.g., an array of properties)
    const properties = [
        {
            location: {
                street: "123 Main Street",
                city: "City 1",
                zip: "12345",
            },
            price: 500000,
            rooms: {
                bedrooms: 3,
                bathrooms: 2,
            },
            // Add more property details here
        },
        {
            location: {
                street: "456 Elm Street",
                city: "City 2",
                zip: "67890",
            },
            price: 600000,
            rooms: {
                bedrooms: 4,
                bathrooms: 3,
            },
            // Add more property details here
        },
        // Add more properties as needed
    ];

    // Return the property details based on propertyIndex
    return properties[propertyIndex];
}

// Function to display property details on the page
function displayPropertyDetails(propertyDetails) {
    // Get references to HTML elements where you want to display details
    const streetElement = document.getElementById("street");
    const priceElement = document.getElementById("price");
    // Add more elements as needed

    // Populate the HTML elements with property details
    streetElement.textContent = propertyDetails.location.street;
    priceElement.textContent = `Price: €${propertyDetails.price.toLocaleString('en-US')}`;
    // Populate other elements with relevant details
}

document.addEventListener("DOMContentLoaded", function () {
    // Extract propertyIndex from the URL
    const propertyIndex = getPropertyIndexFromURL();

    // Fetch property details based on propertyIndex
    const propertyDetails = fetchPropertyDetails(propertyIndex);

    // Display property details on the page
    displayPropertyDetails(propertyDetails);
});
