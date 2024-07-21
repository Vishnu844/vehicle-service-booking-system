const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  vehicleType: { type: String, required: true },
  serviceType: { type: String, required: true },
  bookingDate: { type: Date, required: true, default: Date.now() },
});

module.exports = mongoose.model("booking", bookingSchema);
