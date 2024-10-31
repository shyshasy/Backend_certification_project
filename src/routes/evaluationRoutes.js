import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import {
    getAllEvaluations,
    getEvaluationById,
    createEvaluation,
    updateEvaluation,
    deleteEvaluation
} from '../controllers/evaluationController.js';

const router = express.Router();

// Middleware pour les routes d'évaluations
router.use(helmet());
router.use(cors());

router.get('/evaluations', getAllEvaluations);
router.get('/evaluations/:id', getEvaluationById);
router.post('/evaluations', createEvaluation);
router.put('/evaluations/:id', updateEvaluation);
router.delete('/evaluations/:id', deleteEvaluation);

export default router;
