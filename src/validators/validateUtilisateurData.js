import express from 'express';
import { PrismaClient } from '@prisma/client';
import validator from 'validator'; // Assurez-vous que ce module est installé
const { isEmail, isLength } = validator;

const app = express();
app.use(express.json());

const prisma = new PrismaClient();

export const validateUtilisateurData = async (req, res, next) => {
    const { email, nom, role, status } = req.body;
    let errors = [];

    // Vérification que l'email est défini et valide
    if (!email || !isEmail(email)) {
        errors.push("L'email doit être valide.");
    } else {
        // Vérifier si l'email est déjà utilisé
        const existingUser = await prisma.utilisateur.findUnique({
            where: { email: email }
        });

        if (existingUser) {
            errors.push("L'email est déjà utilisé.");
        }
    }

    // Vérification de la longueur du nom
    if (!nom || !isLength(nom, { min: 1, max: 50 })) {
        errors.push("Le nom doit être entre 1 et 100 caractères.");
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
