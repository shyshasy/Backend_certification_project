// Importer le module 'validator' et PrismaClient
import validator from 'validator';
import { PrismaClient } from '@prisma/client';

// Initialiser PrismaClient
const prisma = new PrismaClient();

// Déstructurer les méthodes que vous voulez utiliser depuis 'validator'
const { isInt, isBoolean } = validator;

// Validation pour créer ou mettre à jour un ticket
const validateTicketData = async (req, res, next) => {
    const { statut, date_heure_creation, numero, guichet_id, utilisateur_id } = req.body;
    let errors = [];

    // Vérification du statut (doit être un booléen)
    if (!isBoolean(String(statut))) {
        errors.push("Le statut doit être vrai ou faux.");
    }

    // Vérification du numéro de ticket (doit être un entier)
    if (!isInt(String(numero))) {
        errors.push("Le numéro de ticket doit être un entier.");
    }

    // Vérification des ID guichet et utilisateur (doivent être des entiers)
    if (!isInt(String(guichet_id))) {
        errors.push("L'ID du guichet doit être un entier.");
    }
    if (!isInt(String(utilisateur_id))) {
        errors.push("L'ID de l'utilisateur doit être un entier.");
    }

    // Vérification de l'unicité du numéro de ticket
    try {
        const existingTicket = await prisma.ticket.findUnique({
            where: { numero: Number(numero) }
        });

        if (existingTicket) {
            errors.push("Le numéro de ticket doit être unique.");
        }
    } catch (error) {
        console.error('Erreur lors de la vérification du ticket :', error);
        errors.push("Erreur lors de la vérification du ticket.");
    }

    // Si des erreurs sont présentes, retourner une réponse d'erreur
    if (errors.length > 0) {
        return res.status(400).json({ errors });
    }

    // Passer à la prochaine étape si tout est valide
    next();
};

// Exportation par défaut
export default validateTicketData;
