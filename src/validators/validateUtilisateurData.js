import express from 'express';
import { PrismaClient } from '@prisma/client';
import validator from 'validator'; // Assurez-vous que ce module est installé
const { isEmail, isLength } = validator;

const app = express();
app.use(express.json());

const prisma = new PrismaClient();

export const validateUtilisateurData = async (req, res, next) => {
    const { email, nom, role, status } = req.body;
    const userId = req.params.id; // Assurez-vous que l'ID est bien passé dans l'URL
    let errors = [];

    // Vérification de l'email uniquement s'il est fourni (optionnel lors de l'update)
    if (email) {
        if (!isEmail(email)) {
            errors.push("L'email doit être valide.");
        } 
    }

    // Vérification de la longueur du nom
    if (!nom || !isLength(nom, { min: 1, max: 50 })) {
        errors.push("Le nom doit être entre 1 et 50 caractères.");
    }

    // Gestion du statut : accepter seulement un booléen
    if (typeof status !== 'boolean') {
        errors.push("Le statut doit être true ou false.");
    }

    // Si des erreurs sont présentes, retourner une réponse d'erreur
    if (errors.length > 0) {
        return res.status(400).json({ errors });
    }

    // Passer à la prochaine étape si tout est valide
    next();
};

// Expose le serveur sur le port 5000
// app.listen(5000, () => {
//     console.log('Server is running on port 5000');
// });
