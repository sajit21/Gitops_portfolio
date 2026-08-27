import {
  createArticle,
  getArticle,
  updateArticle,
  deleteArticle,
} from "../controllers/article.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";
import expres from "express";
const router = expres.Router();

router.post("/create", protectRoute,createArticle);
// router.get("/get", verifySession, getArticle);
router.get("/get", getArticle);

router.put("/update/:id", protectRoute, updateArticle);
router.delete("/delete/:id", protectRoute, deleteArticle);

export default router;
