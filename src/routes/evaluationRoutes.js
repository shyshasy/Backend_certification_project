import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import {
    getAllEvaluations,
    getEvaluationById,
    createEvaluation,
    deleteEvaluation
} from '../controllers/evaluationController.js';

// Importer le validateur pour les évaluations
import { validateEvaluationData } from '../validators/validateEvaluationData.js';

const router = express.Router();

// Middleware pour les routes d'évaluations
router.use(helmet());
router.use(cors());

// Routes pour les évaluations
router.get('/evaluations', getAllEvaluations);
router.get('/evaluations/:id', getEvaluationById);

// Appliquer le validateur lors de la création d'une évaluation
router.post('/evaluations', validateEvaluationData, createEvaluation);

// Appliquer le validateur lors de la mise à jour d'une évaluation

router.delete('/evaluations/:id', deleteEvaluation);

export default router;
