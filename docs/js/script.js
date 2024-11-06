// Replace `your-vercel-domain.com` with your actual Vercel domain
const baseURL = 'https://your-vercel-domain.com/api';

// Fetch player balances from the backend
async function fetchPlayerBalances() {
    try {
        const response = await fetch(`${baseURL}/items`);
        const data = await response.json();
        console.log("Player balances:", data);
        // Process data as needed in your frontend
    } catch (error) {
        console.error("Error fetching player balances:", error);
    }
}

// Fetch events from the backend
async function fetchEvents() {
    try {
        const response = await fetch(`${baseURL}/events`);
        const data = await response.json();
        console.log("Events:", data);
        // Process data as needed in your frontend
    } catch (error) {
        console.error("Error fetching events:", error);
    }
}

// Fetch updates from the backend
async function fetchPlayerUpdates() {
    try {
        const response = await fetch(`${baseURL}/updates`);
        const data = await response.json();
        console.log("Player updates:", data);
        // Process data as needed in your frontend
    } catch (error) {
        console.error("Error fetching player updates:", error);
    }
}

// Example of updating the balance by sending data to the backend
async function updateBalance(updatedCountries) {
    try {
        const response = await fetch(`${baseURL}/items`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedCountries),
        });
        const result = await response.text();
        console.log(result); // Success message
    } catch (error) {
        console.error("Error updating balance:", error);
    }
}

// Example of adding an event
async function addEvent(newEvent) {
    try {
        const response = await fetch(`${baseURL}/events`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newEvent),
        });
        const result = await response.text();
        console.log(result); // Success message
    } catch (error) {
        console.error("Error adding event:", error);
    }
}

// Run fetch functions on window load
window.onload = () => {
    fetchPlayerBalances();
    fetchEvents();
    fetchPlayerUpdates();
};
