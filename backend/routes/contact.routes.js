import express from "express"
import { contactSent } from "../controllers/contact.controller.js";
const router=express.Router();


router.post("/contactsent",contactSent)
export default router;