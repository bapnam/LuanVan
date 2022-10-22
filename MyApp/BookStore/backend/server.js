const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const morgan = require('morgan');

const authorRoute = require("./routes/author");
const bookRoute = require("./routes/book");

// dotenv
dotenv.config();

//
const app = express();
const port = 9000;

//
app.use(cors());
app.use(express.json());
app.use(morgan("common"));


// connect database
mongoose.connect((process.env.MONGODB_URL), {dbName: "BookStore"}, () => {
    try {
        console.log("Connected to MongoDB!");
    } catch (error) {
        console.log(error);
    } 
});

// 
app.use("/v1/author", authorRoute);

app.use("/v1/book", bookRoute);

//
app.listen(port, () => {
    console.log("Server is running...");
});



