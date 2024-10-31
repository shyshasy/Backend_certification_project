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

const router = express.Router();

// Middleware pour les routes de tickets
router.use(helmet());
router.use(cors());

router.get('/tickets', getAllTickets);
router.get('/tickets/:id', getTicketById);
router.post('/tickets', createTicket);
router.put('/tickets/:id', updateTicket);
router.delete('/tickets/:id', deleteTicket);

export default router;
