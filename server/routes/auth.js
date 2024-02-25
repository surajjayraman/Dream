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

// Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // check if the user exists
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User does not exist!" });

    // check if the password is correct
    const passwordCorrect = await brcypt.compare(password, user.password);
    if (!passwordCorrect)
      return res.status(400).json({ message: "Invalid Credentials!" });
    //if password is correct, create a token
    const token = jwt.sign(
      { email: user.email, id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    delete user.password;
    res
      .status(200)
      .json({ message: "User logged in successfully!", user, token });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Login failed!", error: err.message });
  }
});

module.exports = router;
