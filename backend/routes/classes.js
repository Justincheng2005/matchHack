import express from "express";
import { getClassStudents, getClassGroups } from "../controllers/classes.js";

const router = express.Router();

router.get("/", getClassStudents);
router.get("/:classId", getClassGroups);



export default router;