import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import {
    getAllGuichets,
    getGuichetById,
    createGuichet,
    updateGuichet,
    deleteGuichet
} from '../controllers/guichetController.js';

const router = express.Router();

// Middleware pour les routes de guichets
router.use(helmet());
router.use(cors());

router.get('/guichets', getAllGuichets);
router.get('/guichets/:id', getGuichetById);
router.post('/guichets', createGuichet);
router.put('/guichets/:id', updateGuichet);
router.delete('/guichets/:id', deleteGuichet);

export default router;
