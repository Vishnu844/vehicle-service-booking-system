const {
  getBooking,
  getAllBookings,
  createBooking,
  updateBooking,
  deleteBooking,
} = require("../controllers/booking");
const loginAuth = require("../middleware/loginAuth");
const router = require("express").Router();

router.get("/bookings/:bookingId", loginAuth, getBooking);
router.get("/bookings", loginAuth, getAllBookings);
router.post("/bookings/create", loginAuth, createBooking);
router.put("/bookings/update/:bookingId", loginAuth, updateBooking);
router.delete("/bookings/delete/:bookingId", loginAuth, deleteBooking);

module.exports = router;
