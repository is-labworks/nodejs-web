const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const articleRouter = require("./routes/articleRouter");
const commentRouter = require("./routes/commentRouter");

// load .env file
dotenv.config();
const app = express();

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//MongoDB connection setup
mongoose.set('strictQuery', true);
//Database connection
const MONGO_URI = process.env.URL_MONGO + process.env.DATABASE_NAME;
console.log("MongoDB URI: ", MONGO_URI);

//MongoDB connection check
mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((err) => {
    console.error("MongoDB connection failed: ", err.message);    
  })

//Routes
app.use("/api/articles", articleRouter);
app.use("/api/comments", commentRouter);

// Get port from .env or fallback to 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});