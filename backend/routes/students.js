import express from 'express';
import { getStudent, joinClass ,getStudentClasses, getStudentStudyGroups, getStudentAvailability, studentLogin, studentLogout } from '../controllers/students.js';

const router = express.Router();

router.get('/', getStudent);
router.post('/joinClass', joinClass);
router.get('/classes', getStudentClasses);
router.get('/studyGroups', getStudentStudyGroups);
router.get('/availability', getStudentAvailability);
router.post('/login', studentLogin);
router.post('/logout', studentLogout);

export default router;