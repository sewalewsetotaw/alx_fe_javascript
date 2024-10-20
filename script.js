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
// Function to add new quotes 
function createAddQuoteForm(){

}
let newQuote = document.getElementById("newQuote");
newQuote.addEventListener('click', showRandomQuote);

createAddQuoteForm();
