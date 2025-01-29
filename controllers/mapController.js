const db = require("../db/queries");


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

  const target = await db.getTarget(id);

  if (!target) {
    // next(new CustomError("Not Found", "Failed to get target", 404));
    res.status(404).json({
      errorMsg: "Could not find target",
    });
  }

  if (target.coordinates.x === x && target.coordinates.y === y) {
    const foundTarget = await db.setIsFound(id);

    res.json({
      success: true,
      message: 'target found',
      isFound: foundTarget.isFound
    })
  } else {
    res.json({
      success: true,
      message: 'missed',
      isFound: target.isFound
    })
  }
}

module.exports = {
  getTarget,
  verifyTarget
}

/*
- User clicks at X and Y with selected target
- Request gets sent with X,Y and the selected target
- Backend checks if the targets X,Y match the user's


*/
