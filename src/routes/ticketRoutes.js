import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import {
    getAllTickets,
    getTicketById,
    createTicket,
    updateTicket,
    deleteTicket
} from '../controllers/ticketController.js';
import { authenticateToken } from "../middlewares/authMiddleware.js";

// Importer le validateur pour les tickets
import validateTicketData from '../validators/validateTicketData.js';
// import authMiddleware from '../middlewares/authMiddleware.js';


const router = express.Router();

// Middleware pour les routes de tickets
router.use(helmet());
router.use(cors());

// Routes pour les tickets
router.get('/tickets',authenticateToken, getAllTickets);
router.get('/tickets/:id', authenticateToken,getTicketById);

// Appliquer le validateur lors de la création d'un ticket
router.post('/tickets',authenticateToken, validateTicketData, createTicket);

// Appliquer le validateur lors de la mise à jour d'un ticket
router.put('/tickets/:id',authenticateToken, validateTicketData, updateTicket);

router.delete('/tickets/:id', authenticateToken,deleteTicket);

export default router;
