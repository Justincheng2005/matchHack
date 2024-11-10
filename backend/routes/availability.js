import express from 'express';
import { getAvailabilityAtTime, addAvailability, deleteAvailability } from '../controllers/availability.js';

const router = express.Router();

router.get('/', getAvailabilityAtTime);
router.post('/', addAvailability);
router.delete('/', deleteAvailability);

export default router;
