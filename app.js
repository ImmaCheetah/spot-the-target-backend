require("dotenv").config();

const express = require("express");
const path = require("node:path");
const cors = require("cors");

// Initialize app
const app = express();
const PORT = process.env.PORT || 3000;

// Path to public folder
const assetsPath = path.join(__dirname, "/public");

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(assetsPath));

// Routers
const indexRouter = require("./routes/indexRouter");
const mapRouter = require("./routes/mapRouter");
const leaderboardRouter = require("./routes/leaderboardRouter");

app.use("/", indexRouter);
app.use("/map", mapRouter);
app.use("/leaderboard", leaderboardRouter);

app.use((err, req, res, next) => {
  console.error("APP ERROR", err);

  res.status(err.statusCode || 500).json({
    name: err.name,
    errorMsg: err.message,
    status: err.statusCode,
  });
});

app.listen(process.env.PORT, () => console.log("App running on port", PORT));