import { Router } from 'express';
import { createVaccine } from '../controllers/vaccineController';
import { createDeworming } from '../controllers/dewormingController';
import { createAllergy } from '../controllers/allergyController';
import { authenticateToken } from '../middleware/auth';

const router = Router();

router.use(authenticateToken);
router.post('/vaccines', createVaccine);
router.post('/deworming', createDeworming);
router.post('/allergies', createAllergy);

export default router;
