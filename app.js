const express = require('express')
const path = require('path')
require("dotenv").config();
const cors = require('cors');
const app = express().use('*', cors());
var compression = require('compression')
const connectDB = require("./configs/db");

app.use(compression())

app.get('/', (req, res) => {
    return res.json({
        status: 'Working',
        name: "LD Coding Challenge",
    });
});

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }))

// parse application/json
app.use(express.json())

//connection to the database
connectDB();

//Routes
const routes = require("./src/routes/text.router");
app.use("/text", routes);

const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log("server up and running on PORT :", port);
});