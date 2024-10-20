// script.js

// Array to store quote objects
let quotes = [
    { text: "The only way to do great work is to love what you do.", category: "Inspiration" },
    { text: "Life is what happens when you're busy making other plans.", category: "Life" },
    { text: "Get busy living or get busy dying.", category: "Motivation" },
];

// Function to display a random quote
function showRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const quoteDisplay = document.getElementById("quoteDisplay");
    quoteDisplay.innerHTML = `"${quotes[randomIndex].text}" - <em>${quotes[randomIndex].category}</em>`;
}

// Function to create the form for adding new quotes
function createAddQuoteForm() {
    const addQuoteButton = document.getElementById("addQuoteButton");
    addQuoteButton.onclick = addQuote;
}

// Function to add a new quote
function addQuote() {
    const newQuoteText = document.getElementById("newQuoteText").value;
    const newQuoteCategory = document.getElementById("newQuoteCategory").value;

    if (newQuoteText && newQuoteCategory) {
        quotes.push({ text: newQuoteText, category: newQuoteCategory });
        document.getElementById("newQuoteText").value = ""; // Clear the input
        document.getElementById("newQuoteCategory").value = ""; // Clear the input
        alert("Quote added successfully!");
    } else {
        alert("Please enter both quote text and category.");
    }
}

// Initialize the application
document.getElementById("newQuote").onclick = showRandomQuote;
createAddQuoteForm();
