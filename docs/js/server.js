const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Utility function to read JSON files with error handling
const readJsonFile = (filePath, res, callback) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error(`Error reading ${filePath}:`, err);
            return res.status(500).json({ error: `Error reading ${filePath}` });
        }
        try {
            const jsonData = JSON.parse(data);
            callback(jsonData);
        } catch (parseErr) {
            console.error(`Error parsing ${filePath}:`, parseErr);
            res.status(500).json({ error: `Error parsing ${filePath}` });
        }
    });
};

// Endpoint to get items
app.get('/items', (req, res) => {
    readJsonFile('/var/www/html/items.json', res, (data) => res.json(data));
});

// Endpoint to get events
app.get('/events', (req, res) => {
    readJsonFile('/var/www/html/events.json', res, (data) => res.json(data));
});

// Endpoint to get updates
app.get('/updates', (req, res) => {
    readJsonFile('/var/www/html/updates.json', res, (data) => res.json(data));
});

// Endpoint to update the balance in items.json
app.post('/update-balance', (req, res) => {
    const updatedItems = req.body;
    fs.writeFile('/var/www/html/items.json', JSON.stringify(updatedItems, null, 2), (err) => {
        if (err) {
            console.error("Error writing to items.json:", err);
            return res.status(500).json({ error: "Error updating items.json" });
        }
        res.json({ message: 'Balance updated successfully' });
    });
});

// Endpoint to add an event to events.json
app.post('/add-event', (req, res) => {
    const newEvent = req.body;
    readJsonFile('/var/www/html/events.json', res, (events) => {
        events.push(newEvent);
        fs.writeFile('/var/www/html/events.json', JSON.stringify(events, null, 2), (err) => {
            if (err) {
                console.error("Error writing to events.json:", err);
                return res.status(500).json({ error: "Error updating events.json" });
            }
            res.json({ message: 'Event added successfully' });
        });
    });
});

// Endpoint to update player updates in updates.json
app.post('/update-player-updates', (req, res) => {
    const newUpdate = req.body;
    readJsonFile('/var/www/html/updates.json', res, (updates) => {
        updates = updates.filter(update => update.player !== newUpdate.player);
        updates.unshift(newUpdate);
        fs.writeFile('/var/www/html/updates.json', JSON.stringify(updates, null, 2), (err) => {
            if (err) {
                console.error("Error writing to updates.json:", err);
                return res.status(500).json({ error: "Error updating updates.json" });
            }
            res.json({ message: 'Player update added successfully' });
        });
    });
});

// Endpoint to delete an event from events.json
app.post('/delete-event', (req, res) => {
    const updatedEvents = req.body;
    fs.writeFile('/var/www/html/events.json', JSON.stringify(updatedEvents, null, 2), (err) => {
        if (err) {
            console.error("Error writing to events.json:", err);
            return res.status(500).json({ error: "Error updating events.json" });
        }
        res.json({ message: 'Event deleted successfully' });
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
