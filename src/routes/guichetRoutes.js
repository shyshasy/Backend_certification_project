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
import { authenticateToken } from "../middlewares/authMiddleware.js";

// Importer le validateur pour les guichets
import validateGuichetData from '../validators/validateGuichetData.js';
// import authMiddleware from '../middlewares/authMiddleware.js';
import roleAdminMiddleware from '../middlewares/roleAdminMiddlewares.js';

const router = express.Router();

// Middleware pour les routes de guichets
router.use(helmet());
router.use(cors());

// Routes pour les guichets
router.get('/guichets', authenticateToken ,roleAdminMiddleware, getAllGuichets);
router.get('/guichets/:id', authenticateToken  ,roleAdminMiddleware, getGuichetById);

// Appliquer le validateur lors de la création d'un guichet
router.post('/guichets', authenticateToken  ,roleAdminMiddleware, validateGuichetData, createGuichet);

// Appliquer le validateur lors de la mise à jour d'un guichet
router.put('/guichets/:id',authenticateToken , roleAdminMiddleware, validateGuichetData, updateGuichet);

router.delete('/guichets/:id',authenticateToken ,roleAdminMiddleware, deleteGuichet);

export default router;
