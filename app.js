require("dotenv").config();

const express = require("express");
const path = require("node:path");
const cors = require("cors");

// Initialize app
const app = express();
const PORT = process.env.PORT || 3000;

// Path to public folder
const assetsPath = path.join(__dirname, "/public");

const corsOptions = {
  origin:'*', 
  credentials:true,
  optionSuccessStatus:200,
}

app.use(cors(corsOptions))
app.set('trust proxy', true)
app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});
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
