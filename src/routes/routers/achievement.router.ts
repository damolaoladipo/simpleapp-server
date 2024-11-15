// src/routes/achievement.routes.ts

import { Router } from "express";
import {
  createAchievement,
  getUserAchievements,
  getAchievementById,
  updateAchievement,
  deleteAchievement,
} from "../../controllers/achievement.controller";

const achievementRouter = Router();

achievementRouter.post("/:userId", createAchievement);
achievementRouter.get("/:userId", getUserAchievements);
achievementRouter.get("/id/:id", getAchievementById);
achievementRouter.put("/:id", updateAchievement);
achievementRouter.delete("/:id", deleteAchievement);

export default achievementRouter;
