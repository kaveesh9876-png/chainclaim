const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require('path');
require('dotenv').config();

const claimRoutes = require("./routes/claimRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// API routes
app.use("/api/claims", claimRoutes);

// Serve frontend static files from repository root
app.use(express.static(path.join(__dirname, '..')));

// Fallback for SPA routes
app.get('*', (req, res) => {
    const indexPath = path.join(__dirname, '..', 'index.html');
    res.sendFile(indexPath, (err) => {
        if (err) res.status(500).send('Error loading frontend');
    });
});

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/chainclaim';

async function startServer() {
    try {
        await mongoose.connect(MONGO_URI); // fixed: removed deprecated options
        console.log('MongoDB connected');
    } catch (err) {
        console.warn('Warning: Failed to connect to MongoDB.');
        console.warn(err.message);
    }

    app.listen(PORT, () => {
        console.log(`Server Running On Port ${PORT}`);
    });
}

startServer();