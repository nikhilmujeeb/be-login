// db.js
const mongoose = require('mongoose');
const mongoURI = process.env.MONGO_URI || 'mongodb+srv://nikhilmujeeb:sjgnXxzO2CqiPjlL@login.0ccva.mongodb.net/?retryWrites=true&w=majority&appName=login';

const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;
