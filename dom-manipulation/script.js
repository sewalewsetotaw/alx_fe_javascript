// Array to store quote objects
// Save quotes to local storage
function loadQuotesFromLocalStorage() {
    const storedQuotes = localStorage.getItem('quotes');
    if (storedQuotes) {
        quotes = JSON.parse(storedQuotes);  // Parse the stored string into an array of objects
    }
}
function saveQuotesToLocalStorage() {
    localStorage.setItem('quotes', JSON.stringify(quotes));  // Convert the array to a string and save
}
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
        quoteDisplay.innerHTML += `<p>"${newQuoteText}" - <em>${newQuoteCategory}</em></p>`;
        saveQuotesToLocalStorage();
        document.getElementById("newQuoteText").value = ""; // Clear the input
        document.getElementById("newQuoteCategory").value = ""; // Clear the input
    } else {
        alert("Please enter both quote text and category.");
    }
}
// Function to export quotes to JSON file
function exportQuotesToJSON() {
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
function importQuotesFromJSON(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const importedQuotes = JSON.parse(e.target.result);
            quotes = [...quotes, ...importedQuotes];  // Add imported quotes to existing array
            saveQuotesToLocalStorage();  // Save updated quotes to local storage
            showRandomQuote();  // Optionally display a quote to show the import worked
        };
        reader.readAsText(file);
    }
}

let newQuote = document.getElementById("newQuote");
newQuote.addEventListener('click', showRandomQuote);
loadQuotesFromLocalStorage();
createAddQuoteForm();
// Create the export and import buttons dynamically
function createExportImportButtons() {
    const exportButton = document.createElement('button');
    exportButton.textContent = "Export Quotes to JSON";
    exportButton.onclick = exportQuotesToJSON;
    document.body.appendChild(exportButton);

    const importInput = document.createElement('input');
    importInput.type = "file";
    importInput.accept = "application/json";
    importInput.onchange = importQuotesFromJSON;
    document.body.appendChild(importInput);
}

// Add the export/import buttons to the page
createExportImportButtons();