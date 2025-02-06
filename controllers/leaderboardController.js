const db = require("../db/queries");

async function submitScore(req, res, next) {
  const {scoreId} = req.params;
  const {name, finishedTime} = req.body;
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

module.exports = {
  submitScore,
  getStartTime
}