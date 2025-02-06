const { Router } = require("express");
const leaderboardRouter = Router();
const leaderboardController = require("../controllers/leaderboardController");

leaderboardRouter.get('/:scoreId', leaderboardController.getStartTime)

leaderboardRouter.patch('/:scoreId', leaderboardController.submitScore)

leaderboardRouter.post('/:mapId', leaderboardController.submitScore)

module.exports = leaderboardRouter;