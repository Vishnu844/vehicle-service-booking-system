const express = require("express");
const mongoose = require("mongoose");
const rateLimit = require("express-rate-limit");
const bookingRoute = require("./routes/bookingRoute");
const userRoute = require("./routes/userRoute");
require("dotenv").config();

const app = express();
app.use(express.json());

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

connectDB();

// rate-limiter
const limiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 100,
  message: "Too many requests from this IP, please try again later.",
});
app.use(limiter);

// API Routes
app.use("/api", bookingRoute);
app.use("/api", userRoute);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
