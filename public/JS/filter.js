
// Get all filter elements
const filterElements = document.querySelectorAll(".filter");
const listingCards = document.querySelectorAll(".listing-card");

filterElements.forEach((filter) => {
    filter.addEventListener("click", () => {
        // Get the property to filter by from the data-filter-property attribute
        const filterProperty = filter.getAttribute("data-filter-property");

        // Hide all listing cards
        listingCards.forEach((card) => {
            card.style.display = "none";
        });

        if (filterProperty) {
            // Show only the listing cards that match the selected property
            const matchingCards = document.querySelectorAll(`[data-property="${filterProperty}"]`);
            matchingCards.forEach((card) => {
                card.style.display = "block";
            });
        } else {
            // If no filter is selected, show all listing cards
            listingCards.forEach((card) => {
                card.style.display = "block";
            });
        }
    });

    
});
