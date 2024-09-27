const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
const authRoutes = require('./routes/routes')

app.use(cors());

app.use((req, res, next) => {
    console.log("path " + req.path + " method " + req.method);
    next();
});

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

// DB connection
mongoose
.connect(process.env.MONGO_CONNECTION_STRING)
.then(() => {
    app.listen(process.env.PORT, () => {
        console.log(
            "DB connected Successfully and listening to " + process.env.PORT
        );
    });
})
.catch((error) => console.log(error));

// Routes
app.use("/api", authRoutes);
