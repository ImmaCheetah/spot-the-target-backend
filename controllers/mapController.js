const db = require("../db/queries");
const {isInRange } = require("../helper/isInRange");


async function getMap(req, res, next) {
  const {mapId} = req.params;
  const map = await db.getMap(mapId);

  if (!map) {
    // next(new CustomError("Not Found", "Failed to get map", 404));
    res.status(404).json({
      errorMsg: "Could not find map",
    });
  } else {
    res.json({
      success: true,
      map: map,
    });
  }
}

async function getTarget(req, res, next) {
  const {mapId, targetId} = req.params;
  console.log(targetId);
  const target = await db.getTarget(targetId);

  if (!target) {
    // next(new CustomError("Not Found", "Failed to get target", 404));
    res.status(404).json({
      errorMsg: "Could not find target",
    });
  } else {
    res.json({
      success: true,
      target: target,
    });
  }
}

async function verifyTarget(req, res, next) {
  const {mapId, targetId} = req.params;
  const {x, y, id} = req.body;
  console.log('User Coords', x, y)

  const target = await db.getTarget(id);

  if (!target) {
    // next(new CustomError("Not Found", "Failed to get target", 404));
    res.status(404).json({
      errorMsg: "Could not find target",
    });
  }

  if (isInRange(x, y, target.coordinates.x, target.coordinates.y)) {
      res.json({
      success: true,
      message: 'target found',
      isFound: true,
      coordinates: target.coordinates,
    })
  } else {
    res.json({
      success: true,
      message: 'missed',
      isFound: false
    })
  }
}

async function recordStartTime(req, res, next) {
  const {mapId} = req.params;

  const currentTime = Date.now();
  console.log(currentTime)
  const startTime = await db.setStartTime(mapId, currentTime);

  res.json({
    message: "start time set",
    startTime: startTime
  })
  
}

module.exports = {
  getMap,
  getTarget,
  verifyTarget,
  recordStartTime
}