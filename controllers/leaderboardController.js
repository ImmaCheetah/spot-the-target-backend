const db = require("../db/queries");
const { body, validationResult } = require("express-validator");
const CustomError = require("../helper/CustomError");
const asyncHandler = require("express-async-handler");

const alphaErr = "must contain only letters and numbers";
const lengthErr = "must contain between 1 and 15 characters";

const validateUsername = [
  body("name")
    .trim()
    .matches(/^[A-Za-z0-9]+$/)
    .withMessage(`Username ${alphaErr}`)
    .isLength({ min: 1, max: 15 })
    .withMessage(`Username ${lengthErr}`)
];

const submitScore = asyncHandler(async (req, res, next) => {
  const {scoreId} = req.params;
  const {name, finishedTime} = req.body;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }

  const finalScore = await db.submitScore(scoreId, name, finishedTime);

  if (!finalScore) {
    next(new CustomError("Not Found", "Failed to submit score", 404));
  } else {
    res.json({
      success: true,
      message: "Score submitted",
      finalScore: finalScore
    });
  }
})


const getStartTime = asyncHandler(async (req, res, next) => {
  const {scoreId} = req.params;
  const startTime = await db.getStartTime(scoreId);

  if (!startTime) {
    next(new CustomError("Not Found", "Failed to retrieve data", 404));
  } else {
    res.json({
      success: true,
      startTime,
    });
  }
})

const getLeaderboard = asyncHandler(async (req, res, next) => {
  const {mapId} = req.params;
  const leaderboard = await db.getMapLeaderboard(mapId);

  if (!leaderboard) {
    next(new CustomError("Not Found", "Failed to get leaderboard", 404));
  } else {
    res.json({
      success: true,
      leaderboard,
    });
  }
})

module.exports = {
  submitScore,
  getStartTime,
  getLeaderboard,
  validateUsername
}