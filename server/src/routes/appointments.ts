import { Router } from 'express';
import { createAppointment, getAppointments } from '../controllers/appointmentController';
import { authenticateToken } from '../middleware/auth';

const router = Router();

router.use(authenticateToken);
router.get('/', getAppointments);
router.post('/', createAppointment);

export default router;
