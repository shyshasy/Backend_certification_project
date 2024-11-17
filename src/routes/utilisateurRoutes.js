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


// Importer le validateur pour les utilisateurs
import { validateUtilisateurData } from '../validators/validateUtilisateurData.js'; // Assurez-vous que le chemin vers le validateur est correct
import authMiddleware from '../middlewares/authMiddleware.js';
import roleAdminMiddleware from '../middlewares/roleAdminMiddlewares.js';

const router = express.Router();

// Middleware global de sécurité et de gestion CORS
router.use(helmet()); // Sécurise les en-têtes HTTP
router.use(cors()); // Permet les requêtes entre origines (CORS)

// Routes pour les utilisateurs
router.get('/utilisateurs',authMiddleware, roleAdminMiddleware, getAllUtilisateurs); // Obtenir tous les utilisateurs
router.get('/utilisateurs/:id',authMiddleware, roleAdminMiddleware, getUtilisateurById); // Obtenir un utilisateur par ID

// Appliquer le validateur lors de la création d'un utilisateur
router.post('/utilisateurs',authMiddleware, roleAdminMiddleware, validateUtilisateurData, createUtilisateur);

// Appliquer le validateur lors de la mise à jour d'un utilisateur
router.put('/utilisateurs/:id',authMiddleware, roleAdminMiddleware, validateUtilisateurData, updateUtilisateur);

// Supprimer un utilisateur
router.delete('/utilisateurs/:id',authMiddleware, roleAdminMiddleware, deleteUtilisateur);

export default router;
