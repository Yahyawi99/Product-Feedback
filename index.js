require("dotenv").config();
require("express-async-errors");

const path = require("path");

const cors = require("cors");

const express = require("express");
const app = express();

const feedbacksRoutes = require("./routes/Feedback");
const commentsRoutes = require("./routes/Comment");
const auth = require("./routes/Auth");
const upvotesRoutes = require("./routes/Upvotes");

const connectDB = require("./db/connect");

// Middlewares
app.use(express.static("./build"));
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/v1", [feedbacksRoutes, commentsRoutes, auth, upvotesRoutes]);

const PORT = process.env.PORT || 3000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(PORT, () => {
      console.log(`Listening on Port ${PORT}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
