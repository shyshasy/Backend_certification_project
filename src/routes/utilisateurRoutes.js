import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import {
    getAllUtilisateurs,
    getUtilisateurById,
    createUtilisateur,
    updateUtilisateur,
    deleteUtilisateur
} from '../controllers/utilisateurController.js';

const router = express.Router();

// Middleware pour les routes d'utilisateurs
router.use(helmet());
router.use(cors());

router.get('/utilisateurs', getAllUtilisateurs);
router.get('/utilisateurs/:id', getUtilisateurById);
router.post('/utilisateurs', createUtilisateur);
router.put('/utilisateurs/:id', updateUtilisateur);
router.delete('/utilisateurs/:id', deleteUtilisateur);

export default router;
