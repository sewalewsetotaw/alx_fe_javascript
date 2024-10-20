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
// Create a <div> element
let div = document.createElement('div');

// Create the <input> for new quote text
let inputQuoteText = document.createElement('input');
inputQuoteText.id = 'newQuoteText';
inputQuoteText.type = 'text';
inputQuoteText.placeholder = 'Enter a new quote';

// Create the <input> for new quote category
let inputQuoteCategory = document.createElement('input');
inputQuoteCategory.id = 'newQuoteCategory';
inputQuoteCategory.type = 'text';
inputQuoteCategory.placeholder = 'Enter quote category';

// Create the <button> element
let addButton = document.createElement('button');
addButton.textContent = 'Add Quote';

// Set the onclick event for the button to call the addQuote function
addButton.onclick = addQuote;

// Append the input elements and the button to the <div>
div.appendChild(inputQuoteText);
div.appendChild(inputQuoteCategory);
div.appendChild(addButton);

// Append the entire <div> to the body or a specific element
document.body.appendChild(div);
}
function addQuote() {
    const newQuoteText = document.getElementById("newQuoteText").value;
    const newQuoteCategory = document.getElementById("newQuoteCategory").value;

    if (newQuoteText && newQuoteCategory) {
        quotes.push({ text: newQuoteText, category: newQuoteCategory });
        quoteDisplay.innerHTML += `<p>${newQuoteText}</p>  <em>${newQuoteCategory}</em>`;
        document.getElementById("newQuoteText").value = ""; // Clear the input
        document.getElementById("newQuoteCategory").value = ""; // Clear the input
    } else {
        alert("Please enter both quote text and category.");
    }
    document.createElement('sth').appendChild('sth');
}
let newQuote = document.getElementById("newQuote");
newQuote.addEventListener('click', showRandomQuote);

createAddQuoteForm();
