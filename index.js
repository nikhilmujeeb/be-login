require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require('mongoose');
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");

const app = express();

// Database connection
const dbURI = 'mongodb://127.0.0.1:27017/login_db';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Database is connected'))
  .catch((err) => {
    console.error('Database connection failed:', err.message);
    process.exit(1); // Exit process if db connection fails
  });

// Middlewares
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

// Basic route for testing
app.get("/", (req, res) => {
  res.send("Welcome to the API!");
});

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}...`));
