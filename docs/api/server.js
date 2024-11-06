const express = require('express');
const app = express();

// Middleware to parse JSON requests (if needed)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS Middleware to Allow Frontend Access
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "https://www.kasparovroom.site");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    next();
});

// Routes
app.use('/api/items', require('./items'));
app.use('/api/events', require('./events'));
app.use('/api/updates', require('./updates'));

// Server Listening
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
