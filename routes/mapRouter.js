const { Router } = require("express");
const mapRouter = Router();
const mapController = require("../controllers/mapController");

mapRouter.get("/:mapId", mapController.getMap);

mapRouter.post("/:mapId/target/:targetId", mapController.verifyTarget);

mapRouter.post("/:mapId", mapController.recordStartTime);

module.exports = mapRouter;
