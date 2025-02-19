const { Router } = require("express");
const leaderboardRouter = Router();
const leaderboardController = require("../controllers/leaderboardController");


leaderboardRouter.get('/map/:mapId', leaderboardController.getLeaderboard)
leaderboardRouter.get('/:scoreId', leaderboardController.getStartTime)

// Submit score by updating final time
leaderboardRouter.patch('/:scoreId', leaderboardController.validateUsername, leaderboardController.submitScore)

module.exports = leaderboardRouter;