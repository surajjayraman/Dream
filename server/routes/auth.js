const router = require("express").Router();
const brcypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const multer = require("multer");

const User = require("../models/User");

// Multer set up
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

// Register
router.post("/register", upload.single("profileImage"), async (req, res) => {
  try {
    // take all info from the form
    const { firstName, lastName, email, password } = req.body;
    const profileImage = req.file;

    if (!profileImage) return res.status(400).send("No file uploaded");

    // create a path for the uploaded profile pic
    const profileImagePath = profileImage.path;

    // check if the user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser)
      return res.status(409).json({ message: "User already exists!" });

    // hash the password
    const salt = await brcypt.genSalt();
    const hashedPassword = await brcypt.hash(password, salt);

    // create a new user
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      profileImagePath,
    });

    // save the user to the database
    await newUser.save();

    res
      .status(201)
      .json({ message: "User registered successfully!", user: newUser });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ message: "Registration failed!", error: err.message });
  }
});

module.exports = router;