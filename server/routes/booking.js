const router = require("express").Router();
const Booking = require("../models/Booking");

// create booking
router.post("/create", async (req, res) => {
  try {
    const { customerId, hostId, listingId, startDate, endDate, totalPrice } =
      req.body;
    const newBooking = new Booking({
      customerId,
      hostId,
      listingId,
      startDate,
      endDate,
      totalPrice,
    });

    const savedBooking = await newBooking.save();
    res.status(200).json(savedBooking);
  } catch (err) {
    res
      .status(400)
      .json({ message: "Failed to create new booking", error: err.message });
  }
});

module.exports = router;