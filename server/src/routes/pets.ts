import { Router } from 'express';
import { createPet, getPetById, getPets } from '../controllers/petController';
import { authenticateToken } from '../middleware/auth';

const router = Router();

router.use(authenticateToken);
router.get('/', getPets);
router.post('/', createPet);
router.get('/:id', getPetById);

export default router;
