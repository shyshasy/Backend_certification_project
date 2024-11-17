import express from 'express';
import { creerTicket, getTickets } from '../controllers/fileAttenteController.js';

const router = express.Router();

// Route pour créer un ticket
router.post('/tickets', creerTicket);

// Route pour récupérer les tickets
router.get('/tickets', getTickets);

export { router as fileAttenteRoutes };
