const serverUrl = 'https://jsonplaceholder.typicode.com/posts'; // Simulating the server endpoint
let quotes = [
    { text: "The only way to do great work is to love what you do.", category: "Inspiration" },
    { text: "Life is what happens when you're busy making other plans.", category: "Life" },
    { text: "Get busy living or get busy dying.", category: "Motivation" },
];

// Function to load quotes and selected filter from local storage
function loadQuotesFromLocalStorage() {
    const storedQuotes = localStorage.getItem('quotes');
    const selectedCategory = localStorage.getItem('selectedCategory');
    if (storedQuotes) {
        quotes = JSON.parse(storedQuotes);
    }
    if (selectedCategory) {
        document.getElementById("categoryFilter").value = selectedCategory;
    }
}

// Function to save quotes and the selected filter to local storage
function saveQuotesToLocalStorage() {
    localStorage.setItem('quotes', JSON.stringify(quotes));
    localStorage.setItem('selectedCategory', document.getElementById("categoryFilter").value);
}

// Function to fetch quotes from the server
async function fetchQuotesFromServer() {
    try {
        const response = await fetch(serverUrl);
        const serverQuotes = await response.json();
        handleSync(serverQuotes); // Sync local and server quotes
    } catch (error) {
        console.error("Error fetching quotes from the server:", error);
    }
}

// Function to post new quotes to the server (simulated)
async function postQuoteToServer(newQuote) {
    try {
        await fetch(serverUrl, {
            method: 'POST',
            body: JSON.stringify(newQuote),
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        console.error("Error posting quote to the server:", error);
    }
}

// Function to handle synchronization between local and server data
function handleSync(serverQuotes) {
    let localQuotes = JSON.parse(localStorage.getItem('quotes')) || quotes;
    
    let conflicts = [];
    
    serverQuotes.forEach(serverQuote => {
        const conflict = localQuotes.find(localQuote => localQuote.text === serverQuote.title && localQuote.category !== serverQuote.body);
        if (conflict) {
            conflicts.push(conflict);
        } else if (!localQuotes.some(localQuote => localQuote.text === serverQuote.title)) {
            localQuotes.push({ text: serverQuote.title, category: serverQuote.body });  // Add new server quotes to local storage
        }
    });

    if (conflicts.length > 0) {
        alert(`Conflicts found with the server data! Server data takes precedence.`);
        conflicts.forEach(conflict => {
            console.log("Conflict:", conflict);  // Optionally log conflicts for debugging
        });
    }

    quotes = localQuotes;
    localStorage.setItem('quotes', JSON.stringify(quotes)); // Sync the local storage with merged data
}

// Function to display a random quote based on the selected category
function showRandomQuote() {
    const filteredQuotes = filterQuotesArray();
    if (filteredQuotes.length > 0) {
        const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
        const quoteDisplay = document.getElementById("quoteDisplay");
        quoteDisplay.innerHTML = `"${filteredQuotes[randomIndex].text}" - <em>${filteredQuotes[randomIndex].category}</em>`;
    } else {
        document.getElementById("quoteDisplay").innerHTML = "No quotes available for this category.";
    }
}

// Function to filter quotes based on the selected category
function filterQuotes() {
    saveQuotesToLocalStorage();
    showRandomQuote();
}

// Helper function to filter quotes array based on selected category
function filterQuotesArray() {
    const selectedCategory = document.getElementById("categoryFilter").value;
    if (selectedCategory === "all") {
        return quotes;
    } else {
        return quotes.filter(quote => quote.category === selectedCategory);
    }
}

// Function to populate the categories dynamically in the filter dropdown
function populateCategories() {
    const categories = [...new Set(quotes.map(quote => quote.category))];  // Extract unique categories
    const categoryFilter = document.getElementById("categoryFilter");

    // Clear existing options (except 'All Categories')
    categoryFilter.innerHTML = '<option value="all">All Categories</option>';

    // Add options for each unique category
    categories.forEach(category => {
        const option = document.createElement("option");
        option.value = category;
        option.textContent = category;
        categoryFilter.appendChild(option);
    });
}

// Function to sync periodically with the server
function startSyncInterval() {
    setInterval(fetchQuotesFromServer, 10000);  // Fetch from the server every 10 seconds
}

// Function to add a new quote and sync it to the server
function addQuote() {
    const newQuoteText = document.getElementById("newQuoteText").value;
    const newQuoteCategory = document.getElementById("newQuoteCategory").value;

    if (newQuoteText && newQuoteCategory) {
        const newQuote = { text: newQuoteText, category: newQuoteCategory };

        quotes.push(newQuote);  // Add locally
        localStorage.setItem('quotes', JSON.stringify(quotes));  // Save locally

        postQuoteToServer(newQuote);  // Sync the new quote to the server
        populateCategories();  // Update the category filter
        alert("Quote added and synced to the server!");
    } else {
        alert("Please enter both quote text and category.");
    }
}

// Function to export quotes to a JSON file
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
            populateCategories();  // Update the dropdown with new categories
            showRandomQuote();  // Optionally display a quote to show the import worked
        };
        reader.readAsText(file);
    }
}

// Event listeners for buttons
document.getElementById('newQuote').addEventListener('click', showRandomQuote);
document.getElementById('exportQuotes').addEventListener('click', exportToJsonFile);

// Initialize the app
loadQuotesFromLocalStorage();  // Load any stored quotes and selected filter
populateCategories();  // Populate the category filter dropdown
createAddQuoteForm();  // Create form to add new quotes
showRandomQuote();  // Show a random quote when the page loads
startSyncInterval();  // Start syncing with the server
