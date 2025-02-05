const { Router } = require("express");
const mapRouter = Router();
const mapController = require("../controllers/mapController");

mapRouter.get('/', function(req,res,next) {
  res.json({
    status: 200
  })
})

mapRouter.get('/:mapId', mapController.getMap)
mapRouter.get('/:mapId/target/:targetId', mapController.getTarget)

mapRouter.post('/:mapId/target/:targetId', mapController.verifyTarget)

mapRouter.post('/:mapId', mapController.recordStartTime)

module.exports = mapRouter;