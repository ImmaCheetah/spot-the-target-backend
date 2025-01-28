const db = require("../db/queries");


async function getTarget(req, res, next) {
  const {mapId, targetId} = req.params;
  console.log(targetId);
  const target = await db.getTarget(targetId);

  if (!target) {
    next(new CustomError("Not Found", "Failed to get target", 404));
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

module.exports = {
  getTarget
}