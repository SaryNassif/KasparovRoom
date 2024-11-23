const validPasscode = "1234";  // Change this passcode as needed

async function fetchPlayerBalances() {
    const response = await fetch('http://localhost:3000/items');
    const countries = await response.json();
    const table = document.getElementById('player-balances');

    // Clear existing rows (except the header and last row)
    const rowCount = table.rows.length;
    for (let i = rowCount - 2; i > 0; i--) {  // Keep the last row intact
        table.deleteRow(i);
    }

    // Add countries to the table
    countries.forEach(country => {
        const newRow = table.insertRow(table.rows.length - 1); // Insert before the last row
        const nameCell = newRow.insertCell(0);
        const balanceCell = newRow.insertCell(1);

        nameCell.innerHTML = country.Name;
        balanceCell.innerHTML = `$${country.Money}M`;
    });
}

// Fetch and display events from the backend
async function fetchEvents() {
    const response = await fetch('http://localhost:3000/events');
    const events = await response.json();
    const table = document.getElementById('major-events');

    // Clear existing rows (except the header and last row)
    const rowCount = table.rows.length;
    for (let i = rowCount - 2; i > 0; i--) {  // Keep the last row intact
        table.deleteRow(i);
    }

    // Add events to the table
    events.forEach(event => {
        const newRow = table.insertRow(table.rows.length - 1); // Insert before the last row
        const descriptionCell = newRow.insertCell(0);
        descriptionCell.innerHTML = event.Description;
    });
}


// Add or update a country's balance
async function addBalanceRow() {
    const passcodeInput = document.getElementById('balance-passcode').value;

    if (passcodeInput === validPasscode) {
        const countryName = prompt("Enter Country Name to Update:");
        const newBalance = parseFloat(prompt("Enter New Balance (e.g., 700 for $700M):"));

        // Fetch data from the backend
        const response = await fetch('http://localhost:3000/items');
        const countries = await response.json();
        
        let countryFound = false;
        let previousBalance;
        
        // Find and update the balance for the selected country
        countries.forEach(country => {
            if (country.Name === countryName) {
                previousBalance = country.Money;
                country.Money = newBalance;
                countryFound = true;
            }
        });

        if (countryFound) {
            // Send updated data to the backend
            await fetch('http://localhost:3000/update-balance', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(countries), // Send updated countries array
            });

            alert(`${countryName}'s balance updated to $${newBalance}M!`);
            fetchPlayerBalances(); // Refresh the table
        } else {
            alert("Country not found.");
        }
    } else {
        alert("Invalid passcode. Please try again.");
    }
}

// Function to highlight a row temporarily
function highlightRow(row) {
    // Add highlight class
    row.classList.add('highlight');
    
    // Remove the highlight class after 3 seconds
    setTimeout(() => {
        row.classList.remove('highlight');
    }, 3000); // Highlight duration (in milliseconds)
}

async function addEventRow() {
    const passcodeInput = document.getElementById('event-passcode').value;

    if (passcodeInput === validPasscode) {
        const eventDescription = prompt("Enter Event Description:");

        // Send new event to the backend
        await fetch('http://localhost:3000/add-event', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ Description: eventDescription }),
        });

        alert("Event added successfully!");
        fetchEvents(); // Refresh the events table
    } else {
        alert("Invalid passcode. Please try again.");
    }
}

// Add a new event
async function addEventRow() {
    const passcodeInput = document.getElementById('event-passcode').value;

    if (passcodeInput === validPasscode) {
        const eventDescription = prompt("Enter Event Description:");

        // Send new event to the backend
        await fetch('http://localhost:3000/add-event', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ Description: eventDescription }),
        });

        alert("Event added successfully!");
        fetchEvents(); // Refresh the events table
    } else {
        alert("Invalid passcode. Please try again.");
    }
}

// Delete an event from the backend and the table
async function deleteEventRow() {
    const passcodeInput = document.getElementById('event-passcode').value;

    if (passcodeInput === validPasscode) {
        const eventDescription = prompt("Enter the exact Event Description to Delete:");

        // Fetch events from the backend
        const response = await fetch('http://localhost:3000/events');
        const events = await response.json();

        // Find the event index to delete
        const eventIndex = events.findIndex(event => event.Description === eventDescription);
        
        if (eventIndex === -1) {
            alert("Event not found. Please check the description and try again.");
            return;
        }

        // Remove the event from the array
        events.splice(eventIndex, 1);

        // Send the updated events list to the backend
        await fetch('http://localhost:3000/delete-event', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(events),
        });

        alert("Event deleted successfully!");
        fetchEvents(); // Refresh the events table
    } else {
        alert("Invalid passcode. Please try again.");
    }
}

// Initialize the page
window.onload = function() {
    fetchPlayerBalances();
    fetchEvents();
};
