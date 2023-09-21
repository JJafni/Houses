let sortByPriceAscending = true; // Track the current sorting order for price
let sortBySizeAscending = true; // Track the current sorting order for size


const filterButtons = document.querySelectorAll(".filter-button");
filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filterCriteria = button.getAttribute("data-filter");

    if (filterCriteria === "price") {
      // Toggle the sorting order for price
      sortByPriceAscending = !sortByPriceAscending;
    } else if (filterCriteria === "size") {
      // Toggle the sorting order for size
      sortBySizeAscending = !sortBySizeAscending;
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
      return sortByPriceAscending ? cardAValue - cardBValue : cardBValue - cardAValue;
    } else if (criteria === "size") {
      return sortBySizeAscending ? cardAValue - cardBValue : cardBValue - cardAValue;
    }
  });

  // Clear the card container
  cardContainer.innerHTML = "";

  // Append the sorted cards back to the container
  cards.forEach((card) => {
    cardContainer.appendChild(card);
  });
}


fetch("https://api.intern.d-tt.nl/api/houses", options)
  .then((response) => response.json())
  .then((data) => {
    generateCards(data);
    sortCards("price");
  })
  .catch((error) => {
    console.error("Error fetching data:", error);
  });
