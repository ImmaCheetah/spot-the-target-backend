const db = require("../db/queries");
const {isInRange } = require("../helper/isInRange");
const CustomError = require("../helper/CustomError");
const asyncHandler = require("express-async-handler");


const getMap = asyncHandler(async (req, res, next) => {
  const {mapId} = req.params;
  const map = await db.getMap(mapId);

  if (!map) {
    next(new CustomError("Not Found", "Failed to get map", 404));
  } else {
    res.json({
      success: true,
      map: map,
    });
  }
})


const verifyTarget = asyncHandler(async (req, res, next) => {
  const {mapId, targetId} = req.params;
  const {x, y, id} = req.body;
  console.log('User Coords', x, y)

  const target = await db.getTarget(id);

  if (!target) {
    next(new CustomError("Not Found", "Failed to get target", 404));
  }

  if (isInRange(x, y, target.coordinates.x, target.coordinates.y)) {
      res.json({
      success: true,
      message: 'Target found',
      isFound: true,
      coordinates: target.coordinates,
    })
  } else {
    res.json({
      success: true,
      message: 'Missed',
      isFound: false
    })
  }
})


const recordStartTime = asyncHandler(async (req, res, next) => {
  const {mapId} = req.params;

  const currentTime = Date.now();
  console.log(currentTime)
  const startTime = await db.setStartTime(mapId, currentTime);

  res.json({
    message: "Start time set",
    startTime: startTime
  })
})

module.exports = {
  getMap,
  verifyTarget,
  recordStartTime
}