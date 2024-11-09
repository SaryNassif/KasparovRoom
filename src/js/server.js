const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json()); // Middleware to parse JSON bodies

// Serve the static files (for your frontend if needed)
app.use(express.static(path.join(__dirname, 'public')));

// Endpoint to fetch player balances (reading from the JSON file)
app.get('/items', (req, res) => {
    fs.readFile('./items.json', 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Error reading file');
        }
        res.json(JSON.parse(data));
    });
});

// Endpoint to fetch events (reading from the events JSON file)
app.get('/events', (req, res) => {
    fs.readFile('./events.json', 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Error reading events file');
        }
        res.json(JSON.parse(data));
    });
});

// New endpoint to fetch updates (reading from the updates JSON file)
app.get('/updates', (req, res) => {
    fs.readFile('./updates.json', 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Error reading updates file');
        }
        res.json(JSON.parse(data));
    });
});

// Endpoint to update the balance (write to the JSON file)
app.post('/update-balance', (req, res) => {
    const updatedCountries = req.body;

    // Write updated data to the JSON file
    fs.writeFile('./items.json', JSON.stringify(updatedCountries, null, 2), (err) => {
        if (err) {
            return res.status(500).send('Error writing file');
        }
        res.send('Balance updated successfully');
    });
});

// Endpoint to add an event (write to the events JSON file)
app.post('/add-event', (req, res) => {
    const newEvent = req.body;

    fs.readFile('./events.json', 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Error reading events file');
        }
        const events = JSON.parse(data);
        events.push(newEvent);

        fs.writeFile('./events.json', JSON.stringify(events, null, 2), (err) => {
            if (err) {
                return res.status(500).send('Error writing events file');
            }
            res.send('Event added successfully');
        });
    });
});

// New endpoint to update player updates (write to the updates JSON file)
app.post('/update-player-updates', (req, res) => {
    const newUpdate = req.body;

    fs.readFile('./updates.json', 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Error reading updates file');
        }
        let updates = JSON.parse(data);
        
        // Remove existing update for this player if any
        updates = updates.filter(update => update.player !== newUpdate.player);
        
        // Add new update at the beginning of the array
        updates.unshift(newUpdate);

        fs.writeFile('./updates.json', JSON.stringify(updates, null, 2), (err) => {
            if (err) {
                return res.status(500).send('Error writing updates file');
            }
            res.send('Player update added successfully');
        });
    });
});

// Endpoint to delete an event (rewrite the events JSON file)
app.post('/delete-event', (req, res) => {
    const updatedEvents = req.body;

    // Write the updated events array to the events.json file
    fs.writeFile('./events.json', JSON.stringify(updatedEvents, null, 2), (err) => {
        if (err) {
            return res.status(500).send('Error writing events file');
        }
        res.send('Event deleted successfully');
    });
});


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});