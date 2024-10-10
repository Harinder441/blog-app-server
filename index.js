const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const errorHandler = require("./middleware/errorHandler");
const config = require("./config/config");
const app = express();
const PORT = config.port;

// Middleware
app.use(express.json());

// Connect to MongoDB
console.log("url",config.mongoose.url);
mongoose.connect(config.mongoose.url, config.mongoose.options)
.then(() => console.log("Connected to MongoDB"))
.catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.use("/api/auth", authRoutes);

// Error handling middleware
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
