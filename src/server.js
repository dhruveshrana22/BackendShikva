const mongoose = require('mongoose');
const express = require('express');
const { DB_Name } = require('./constants');

const app = express();

(async () => {
    try {
        // MongoDB connection logic with hardcoded URI
        const mongoURI = "mongodb+srv://dhrurana96:DhruveshRana@cluster0.idgmx.mongodb.net/" + DB_Name;
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("MongoDB connected successfully");
        app.get('/', (req, res) => {
            res.send('Welcome to the Express server');
        });
        // Start the Express server
        const PORT = 5000; // Hardcoded port
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (err) {
        console.log("Error connecting to MongoDB:", err);
    }
})();
