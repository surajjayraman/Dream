const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config(); // to use .env file
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// MONGOOSE SET UP
const port = 3001;
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => console.log(err));
