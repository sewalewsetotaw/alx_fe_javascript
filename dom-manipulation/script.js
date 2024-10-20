// Array to store quote objects
let quotes = [
    { text: "The only way to do great work is to love what you do.", category: "Inspiration" },
    { text: "Life is what happens when you're busy making other plans.", category: "Life" },
    { text: "Get busy living or get busy dying.", category: "Motivation" },
];

// Function to load quotes from local storage
function loadQuotesFromLocalStorage() {
    const storedQuotes = localStorage.getItem('quotes');
    if (storedQuotes) {
        quotes = JSON.parse(storedQuotes);  // Parse the stored string into an array of objects
    }
}

// Function to save quotes to local storage
function saveQuotesToLocalStorage() {
    localStorage.setItem('quotes', JSON.stringify(quotes));  // Convert the array to a string and save
}

// Function to display a random quote
function showRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const quoteDisplay = document.getElementById("quoteDisplay");
    quoteDisplay.innerHTML = `"${quotes[randomIndex].text}" - <em>${quotes[randomIndex].category}</em>`;
}

// Function to add a new quote
function createAddQuoteForm() {
    let div = document.createElement('div');

    let inputQuoteText = document.createElement('input');
    inputQuoteText.id = 'newQuoteText';
    inputQuoteText.type = 'text';
    inputQuoteText.placeholder = 'Enter a new quote';

    let inputQuoteCategory = document.createElement('input');
    inputQuoteCategory.id = 'newQuoteCategory';
    inputQuoteCategory.type = 'text';
    inputQuoteCategory.placeholder = 'Enter quote category';

    let addButton = document.createElement('button');
    addButton.textContent = 'Add Quote';

    addButton.onclick = addQuote;

    div.appendChild(inputQuoteText);
    div.appendChild(inputQuoteCategory);
    div.appendChild(addButton);

    document.body.appendChild(div);
}

// Function to add a new quote to the array and save it
function addQuote() {
    const newQuoteText = document.getElementById("newQuoteText").value;
    const newQuoteCategory = document.getElementById("newQuoteCategory").value;
    if (newQuoteText && newQuoteCategory) {
        quotes.push({ text: newQuoteText, category: newQuoteCategory });
        saveQuotesToLocalStorage(); // Save after adding the new quote
        document.getElementById("newQuoteText").value = ""; // Clear the input
        document.getElementById("newQuoteCategory").value = ""; // Clear the input
    } else {
        alert("Please enter both quote text and category.");
    }
}

// Function to export quotes to JSON file
function exportToJsonFile() {
    const jsonQuotes = JSON.stringify(quotes, null, 2);  // Convert quotes array to JSON string with indentation
    const blob = new Blob([jsonQuotes], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    // Create a download link for the JSON file
    const link = document.createElement("a");
    link.href = url;
    link.download = "quotes.json";
    link.click();
    
    // Revoke the object URL after download
    URL.revokeObjectURL(url);
}

// Function to import quotes from a JSON file
function importFromJsonFile(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const importedQuotes = JSON.parse(e.target.result);
            quotes = [...quotes, ...importedQuotes];  // Add imported quotes to the existing array
            saveQuotesToLocalStorage();  // Save updated quotes to local storage
            showRandomQuote();  // Optionally display a quote to show the import worked
        };
        reader.readAsText(file);
    }
}

// Event listeners for buttons
document.getElementById('newQuote').addEventListener('click', showRandomQuote);
document.getElementById('exportQuotes').addEventListener('click', exportQuotesToJSON);

// Initialize the app
loadQuotesFromLocalStorage();  // Load any stored quotes
createAddQuoteForm();  // Create form to add quotes
