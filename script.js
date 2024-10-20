// Array to store quote objects with text and category
let quotes = [
    { text: "The only way to do great work is to love what you do.", category: "Inspiration" },
    { text: "Life is what happens when you're busy making other plans.", category: "Life" },
    { text: "Get busy living or get busy dying.", category: "Motivation" },
];

// Function to display a random quote
function showRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length); // Generate a random index
    const quote = quotes[randomIndex]; // Select a random quote from the array
    const quoteDisplay = document.getElementById("quoteDisplay");
    
    // Display the quote in the quoteDisplay div
    quoteDisplay.innerHTML = `"${quote.text}" - <em>${quote.category}</em>`;
}

// Function to handle adding a new quote
function addQuote() {
    const newQuoteText = document.getElementById("newQuoteText").value; // Get input value for the new quote
    const newQuoteCategory = document.getElementById("newQuoteCategory").value; // Get input value for the category

    // Ensure both fields are filled in before adding the new quote
    if (newQuoteText && newQuoteCategory) {
        // Add new quote to the quotes array
        quotes.push({ text: newQuoteText, category: newQuoteCategory });
        
        // Clear input fields after submission
        document.getElementById("newQuoteText").value = "";
        document.getElementById("newQuoteCategory").value = "";

        // Notify the user that the quote has been added
        alert("Quote added successfully!");

        // Show the new quote immediately after adding it
        showRandomQuote();
    } else {
        alert("Please enter both a quote and a category.");
    }
}

// Event listeners for button clicks
document.getElementById("newQuote").onclick = showRandomQuote; // Show a random quote when 'Show New Quote' button is clicked
document.getElementById("addQuoteButton").onclick = addQuote; // Add a new quote when 'Add Quote' button is clicked

// Display the first random quote on page load
showRandomQuote();
