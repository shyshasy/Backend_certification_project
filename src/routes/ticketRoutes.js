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

// Importer le validateur pour les tickets
import validateTicketData from '../validators/validateTicketData.js';
import authMiddleware from '../middlewares/authMiddleware.js';


const router = express.Router();

// Middleware pour les routes de tickets
router.use(helmet());
router.use(cors());

// Routes pour les tickets
router.get('/tickets',authMiddleware, getAllTickets);
router.get('/tickets/:id',authMiddleware, getTicketById);

// Appliquer le validateur lors de la création d'un ticket
router.post('/tickets',authMiddleware, validateTicketData, createTicket);

// Appliquer le validateur lors de la mise à jour d'un ticket
router.put('/tickets/:id',authMiddleware, validateTicketData, updateTicket);

router.delete('/tickets/:id',authMiddleware, deleteTicket);

export default router;
