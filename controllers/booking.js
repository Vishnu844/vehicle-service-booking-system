const Booking = require("../models/vehicleBooking");

exports.createBooking = async (req, res) => {
  try {
    const booking = new Booking({
      userId: req.user,
      vehicleType: req.body.vehicleType,
      serviceType: req.body.serviceType,
      bookingDate: req.body.bookingDate,
    });
    await booking.save();
    res.status(200).json({
      status: 1,
      message: "Booking created Successfully",
      data: booking,
    });
  } catch (err) {
    res.status(200).json({
      status: 0,
      message: "Some Error occured",
      data: null,
      error: err.message,
    });
  }
};

exports.getBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.bookingId);
    if (booking === null) {
      res.status(200).json({
        status: 0,
        message: "No booking found!!",
        data: null,
      });
    }
    res.status(200).json({
      status: 1,
      message: "Fetched booking details successfully",
      data: booking,
    });
  } catch (err) {
    res.status(200).json({
      status: 0,
      message: "Some Error occured",
      data: null,
      error: err.message,
    });
  }
};

exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.user });
    res.status(200).json({
      status: 1,
      message: "Successfully fetched all bookings",
      data: bookings,
    });
  } catch (err) {
    res.status(200).json({
      status: 0,
      message: "Some Error occured",
      data: null,
      error: err.message,
    });
  }
};

exports.updateBooking = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(
      req.params.bookingId,
      req.body,
      { new: true }
    );
    res.status(200).json({
      status: 1,
      message: "Booking updated",
      data: booking,
    });
  } catch (err) {
    res.status(200).json({
      status: 0,
      message: "Some Error occured",
      data: null,
      error: err.message,
    });
  }
};

exports.deleteBooking = async (req, res) => {
  try {
    await Booking.findByIdAndDelete(req.params.bookingId);
    res.status(200).json({
      status: 1,
      message: "Booking deleted",
    });
  } catch (err) {
    res.status(200).json({
      status: 0,
      message: "Some Error occured",
      data: null,
      error: err.message,
    });
  }
};
