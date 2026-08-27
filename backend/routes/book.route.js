import express from "express"
import { protectRoute } from "../middleware/auth.middleware.js"
import { createBook,getBook,updateBook,deleteBook} from "../controllers/book.controller.js"

const router=express.Router()

router.post("/createbook",protectRoute,createBook)
// router.get("/getbook",verifySession,getBook)
router.get("/getbook",getBook)

router.put("/updatebook/:id",protectRoute,updateBook)
router.delete("/deletebook/:id",protectRoute,deleteBook)


export default router