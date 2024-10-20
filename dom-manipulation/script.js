const serverUrl = 'https://jsonplaceholder.typicode.com/posts'; // Simulating the server endpoint
let quotes = [];

// Load quotes from local storage and set initial UI
function loadQuotesFromLocalStorage() {
    const storedQuotes = localStorage.getItem('quotes');
    if (storedQuotes) {
        quotes = JSON.parse(storedQuotes);
    }
    populateCategories();
    showRandomQuote();
}

// Save quotes to local storage
function saveQuotesToLocalStorage() {
    localStorage.setItem('quotes', JSON.stringify(quotes));
}

// Fetch quotes from the server
async function fetchQuotesFromServer() {
    try {
        const response = await fetch(serverUrl);
        const serverQuotes = await response.json();
        syncQuotes(serverQuotes);
    } catch (error) {
        console.error("Error fetching quotes from the server:", error);
        notifyUser("Failed to sync quotes from the server.", "error");
    }
}

// Sync local quotes with server data and handle conflicts
function syncQuotes(serverQuotes) {
    const localQuotes = [...quotes];
    let conflicts = [];
    let newQuotes = [];

    serverQuotes.forEach(serverQuote => {
        const localQuote = localQuotes.find(local => local.text === serverQuote.title);

        if (localQuote) {
            if (localQuote.category !== serverQuote.body) {
                conflicts.push({
                    local: localQuote,
                    server: { text: serverQuote.title, category: serverQuote.body }
                });
            }
        } else {
            newQuotes.push({ text: serverQuote.title, category: serverQuote.body });
        }
    });

    if (conflicts.length > 0) {
        notifyUser("Conflicts found! Server data will take precedence.", "warning");
        conflicts.forEach(conflict => {
            const index = localQuotes.indexOf(conflict.local);
            if (index > -1) {
                localQuotes.splice(index, 1); // Remove the local quote
            }
        });
    }

    quotes = [...localQuotes, ...newQuotes];
    saveQuotesToLocalStorage();
    notifyUser("Quotes synced with server!"); 
}

// Notify user with UI notifications
function notifyUser(message, type) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.className = `notification ${type}`;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Periodically check for new quotes from the server
function startSyncInterval() {
    fetchQuotesFromServer();
    setInterval(fetchQuotesFromServer, 10000); // Fetch from the server every 10 seconds
}

// Show a random quote based on the selected category
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

// Filter quotes based on the selected category
function filterQuotes() {
    saveQuotesToLocalStorage();
    showRandomQuote();
}

// Helper function to filter quotes array based on selected category
function filterQuotesArray() {
    const selectedCategory = document.getElementById("categoryFilter").value;
    return selectedCategory === "all" ? quotes : quotes.filter(quote => quote.category === selectedCategory);
}

// Populate the categories dynamically in the filter dropdown
function populateCategories() {
    const categories = [...new Set(quotes.map(quote => quote.category))];
    const categoryFilter = document.getElementById("categoryFilter");
    categoryFilter.innerHTML = '<option value="all">All Categories</option>';

    categories.forEach(category => {
        const option = document.createElement("option");
        option.value = category;
        option.textContent = category;
        categoryFilter.appendChild(option);
    });
}

// Add a new quote and sync it to the server
function addQuote() {
    const newQuoteText = document.getElementById("newQuoteText").value;
    const newQuoteCategory = document.getElementById("newQuoteCategory").value;

    if (newQuoteText && newQuoteCategory) {
        const newQuote = { text: newQuoteText, category: newQuoteCategory };
        quotes.push(newQuote);
        saveQuotesToLocalStorage();
        postQuoteToServer(newQuote);
        populateCategories();
        notifyUser("Quote added and synced to the server!", "success");
    } else {
        alert("Please enter both quote text and category.");
    }
}

// Post new quotes to the server (simulated)
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
// Function to export quotes to JSON file
function exportToJsonFile () {
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
document.getElementById('exportQuotes').addEventListener('click', exportToJsonFile );

// Initialize the app
loadQuotesFromLocalStorage();
startSyncInterval();
createAddQuoteForm();
