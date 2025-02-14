const db = require("../db/queries");
const { body, validationResult } = require("express-validator");

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

async function submitScore(req, res, next) {
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
    // next(new CustomError("Not Found", "Failed to get map", 404));
    res.status(404).json({
      errorMsg: "Could not submit score",
    });
  } else {
    res.json({
      success: true,
      message: "score submitted",
      finalScore: finalScore
    });
  }
}

async function getStartTime(req, res, next) {
  const {scoreId} = req.params;
  const startTime = await db.getStartTime(scoreId);

  if (!startTime) {
    // next(new CustomError("Not Found", "Failed to get map", 404));
    res.status(404).json({
      errorMsg: "Could not get time",
    });
  } else {
    res.json({
      success: true,
      startTime,
    });
  }
}

async function getLeaderboard(req, res, next) {
  const {mapId} = req.params;
  const leaderboard = await db.getMapLeaderboard(mapId);

  if (!leaderboard) {
    // next(new CustomError("Not Found", "Failed to get map", 404));
    res.status(404).json({
      errorMsg: "Could not get leaderboard",
    });
  } else {
    res.json({
      success: true,
      leaderboard,
    });
  }
}

module.exports = {
  submitScore,
  getStartTime,
  getLeaderboard,
  validateUsername
}