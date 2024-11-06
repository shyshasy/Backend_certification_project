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

// Importer le validateur pour les guichets
import validateGuichetData from '../validators/validateGuichetData.js';

const router = express.Router();

// Middleware pour les routes de guichets
router.use(helmet());
router.use(cors());

// Routes pour les guichets
router.get('/guichets', getAllGuichets);
router.get('/guichets/:id', getGuichetById);

// Appliquer le validateur lors de la création d'un guichet
router.post('/guichets', validateGuichetData, createGuichet);

// Appliquer le validateur lors de la mise à jour d'un guichet
router.put('/guichets/:id', validateGuichetData, updateGuichet);

router.delete('/guichets/:id', deleteGuichet);

export default router;
