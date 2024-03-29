const router = require("express").Router();
const multer = require("multer");

const Listing = require("../models/Listing");
const User = require("../models/User");

// multer set up
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

// create a listing
router.post("/create", upload.array("listingPhotos"), async (req, res) => {
  try {
    const listing = new Listing({
      creator: req.body.creator,
      category: req.body.category,
      type: req.body.type,
      streetAddress: req.body.streetAddress,
      aptSuite: req.body.aptSuite,
      city: req.body.city,
      province: req.body.province,
      country: req.body.country,
      guestCount: req.body.guestCount,
      bedroomCount: req.body.bedroomCount,
      bedCount: req.body.bedCount,
      bathroomCount: req.body.bathroomCount,
      amenities: req.body.amenities,
      title: req.body.title,
      description: req.body.description,
      highlight: req.body.highlight,
      highlightDesc: req.body.highlightDesc,
      price: req.body.price,
    });

    const listingPhotos = req.files;
    if (!listingPhotos) {
      return res.status(400).send("No file uploaded");
    }
    const listingPhotoPaths = listingPhotos.map((photo) => photo.path);
    listing.listingPhotoPaths = listingPhotoPaths;

    const savedListing = await listing.save();
    res.status(200).json(savedListing);
  } catch (err) {
    res
      .status(409)
      .json({ message: "Failed to create listing!", error: err.message });
  }
});

// get all listings or by category
router.get("/", async (req, res) => {
  const qCategory = req.query.category;
  try {
    let listings = [];
    if (qCategory) {
      listings = await Listing.find({ category: qCategory }).populate(
        "creator"
      );
    } else {
      listings = await Listing.find().populate("creator");
    }
    res.status(200).json(listings);
  } catch (err) {
    res.status(404).json({ message: "No listings found!", error: err.message });
  }
});

// get a listing by id
router.get("/:listingId", async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.listingId).populate(
      "creator"
    );
    res.status(202).json(listing);
  } catch (err) {
    res.status(404).json({ message: "Listing not found!", error: err.message });
  }
});

// get listing by search
router.get("/search/:search", async (req, res) => {
  try {
    let listings = [];
    const search = req.params.search;
    if (search === "All") {
      listings = await Listing.find().populate("creator");
    } else {
      listings = await Listing.find({
        $or: [
          { category: { $regex: search, $options: "i" } },
          { title: { $regex: search, $options: "i" } },
        ],
      }).populate("creator");
    }

    res.status(200).json(listings);
  } catch (err) {
    res.status(404).json({ message: "No listings found!", error: err.message });
  }
});

module.exports = router;
