import express from "express"
import { protectRoute,  } from "../middleware/auth.middleware.js"
import { createTestimonal ,getTestimonals,editTestimonal,deleteTestimonal} from "../controllers/testimonal.controller.js"

const router=express.Router()

router.post("/createTestimonal",createTestimonal)
router.get("/getTestimonals",getTestimonals)
router.put("/editTestimonal/:id",editTestimonal)
router.delete("/deleteTestimonal/:id",protectRoute,deleteTestimonal)


export default router