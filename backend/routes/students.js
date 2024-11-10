import express from 'express';
import { getStudent, joinClass ,getStudentClasses, getStudentStudyGroups, getStudentAvailability } from '../controllers/students.js';

const router = express.Router();

router.get('/', getStudent);
router.post('/', joinClass);
router.get('/classes', getStudentClasses);
router.get('/studyGroups', getStudentStudyGroups);
router.get('/availability', getStudentAvailability);

export default router;