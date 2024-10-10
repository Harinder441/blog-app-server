const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");
const errorHandler = require("./middleware/errorHandler");
const config = require("./config/config");
const cors = require("cors");
const app = express();
const PORT = config.port;


const fileupload = require("express-fileupload");
app.use(fileupload());
// Middleware
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));

app.use(cors());

// Connect to MongoDB
console.log("url",config.mongoose.url);
mongoose.connect(config.mongoose.url, config.mongoose.options)
.then(() => console.log("Connected to MongoDB"))
.catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.use("/api", routes);

// Error handling middleware
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
