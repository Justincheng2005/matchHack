import express from "express";
import { getClassStudents, getClassGroups } from "../controllers/classes.js";

const router = express.Router();

router.get("/students", getClassStudents);
router.get("/groups", getClassGroups);



export default router;