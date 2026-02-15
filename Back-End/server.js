import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoute from './routes/userRoute.js';
import cors from 'cors';

// Load environment variables from .env file
dotenv.config();

// Create Express app
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Enable CORS for all routes
app.use(cors());

// MongoDB connection
const connectDB = async () => {
  try {

    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected');

  } catch (error) {

    console.error('MongoDB connection error:', error.message);
    process.exit(1);

  }
}

// Basic route for testing
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Connect to MongoDB and start the server
connectDB();

// port configuration
const PORT = process.env.PORT || 5000;

// Use user routes
app.use('/api/users', userRoute);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});