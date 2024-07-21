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

app.use("/api", bookingRoute);
app.use("/api", userRoute);

// API endpoints
// app.post("/api/auth/login", (req, res) => {
//   // Authentication logic to verify username/password
//   // If valid, create and return JWT token
//   const token = jwt.sign({ username: req.body.username }, JWT_SECRET);
//   res.json({ token });
// });

// app.post("/api/bookings", loginAuth, async (req, res) => {
//   try {
//     const booking = new Booking(req.body);
//     await booking.save();
//     res.status(201).json(booking);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// });

// app.get("/api/bookings/:bookingId", loginAuth, async (req, res) => {
//   try {
//     const booking = await Booking.findById(req.params.bookingId);
//     if (booking === null) {
//       return res.status(404).json({ message: "Booking not found" });
//     }
//     res.json(booking);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// Implement other endpoints similarly (PUT, DELETE, GET list)

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
