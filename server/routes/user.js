const router = require("express").Router();

const Booking = require("../models/Booking");

// get trip list
router.get("/:userId/trips", async (req, res) => {
  try {
    const trips = await Booking.find({
      customerId: req.params.userId,
    }).populate("customerId hostId listingId");
    res.status(202).json(trips);
  } catch (err) {
    res
      .status(404)
      .json({ message: "Failed to get trips", error: err.message });
  }
});

module.exports = router;
