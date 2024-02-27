const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config(); // to use .env file
const cors = require("cors");

const authRoutes = require("./routes/auth");
const listingRoutes = require("./routes/listing");

app.use(cors());
app.use(express.json());
app.use(express.static("public"));
// routes
app.use("/auth", authRoutes);
app.use("/properties", listingRoutes);

// MONGOOSE SET UP
const port = 3001;
mongoose
  .connect(process.env.MONGO_URL, {
    dbName: "Dream",
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => console.log(err));
