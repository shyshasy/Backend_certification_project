// src/routes/reportingRoutes.js
import express from 'express';
import { obtenirRapports } from '../controllers/reportingController.js';

const router = express.Router();

// Obtenir les rapports
router.get('/', obtenirRapports);

export default router;
