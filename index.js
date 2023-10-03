const express = require('express');
const app = express();
const mongoose = require('mongoose');
const { parsed: { PORT, MONGO_URL } } = require('dotenv').config();
const router = require('./src/routes');
const port = PORT || 3000;

app.use(express.json());
app.use('/api', router);

const start = async () => {
    try {
        await mongoose.connect(MONGO_URL);
        await app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        })
    } catch (error) {
        console.log(error);
    }
}

start()