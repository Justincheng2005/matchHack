import express from 'express';
import { getStudyGroup, joinStudyGroup, leaveStudyGroup } from '../controllers/studyGroups.js';

const router = express.Router();

router.get('/', getStudyGroup);
router.post('/', joinStudyGroup);
router.delete('/', leaveStudyGroup);

export default router;