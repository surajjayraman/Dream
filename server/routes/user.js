const router = require("express").Router();
const bodyParser = require("body-parser");
router.use(bodyParser.json());

const Booking = require("../models/Booking");
const User = require("../models/User");
const Listing = require("../models/Listing");

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

// Add listing to Wish list
router.patch("/:userId/:listingId", async (req, res) => {
  try {
    const { userId, listingId } = req.params;
    const user = await User.findById(userId);
    const listing = await Listing.findById(listingId).populate("creator");

    const favoriteListing = user.wishList.find(
      (item) => item._id.toString() === listingId
    );

    if (favoriteListing) {
      user.wishList = user.wishList.filter(
        (item) => item._id.toString() !== listingId
      );
      await user.save();
      res.status(200).json({
        message: "Listing removed from wish list",
        wishList: user.wishList,
      });
    } else {
      user.wishList.push(listing);
      await user.save();
      res.status(200).json({
        message: "Listing added to wish list",
        wishList: user.wishList,
      });
    }
  } catch (err) {
    res.status(404).json({
      message: "Failed to add listing to wish list",
      error: err.message,
    });
  }
});

// get property list
router.get("/:userId/properties", async (req, res) => {
  try {
    const properties = await Listing.find({
      creator: req.params.userId,
    }).populate("creator");
    res.status(202).json(properties);
  } catch (err) {
    res
      .status(404)
      .json({ message: "Failed to get properties", error: err.message });
  }
});

// get reservation list
router.get("/:userId/reservations", async (req, res) => {
  try {
    const reservations = await Booking.find({
      hostId: req.params.userId,
    }).populate("customerId hostId listingId");

    res.status(202).json(reservations);
  } catch (err) {
    res
      .status(404)
      .json({ message: "Failed to get reservations", error: err.message });
  }
});


module.exports = router;
