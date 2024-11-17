import { PrismaClient } from '@prisma/client';
import validator from 'validator';
const { isInt, isLength, isBoolean } = validator;

const prisma = new PrismaClient();

// Validation pour créer ou mettre à jour un guichet
const validateGuichetData = async (req, res, next) => {
    const { numero_guichet, status, responsable } = req.body;
    let errors = [];

    // Vérification du numéro de guichet (doit être un entier)
    if (!isInt(String(numero_guichet))) {
        errors.push("Le numéro de guichet doit être un entier.");
    } else {
        // Vérification de l'unicité du numéro de guichet
        const existingGuichet = await prisma.guichet.findUnique({
            where: { numero_guichet: Number(numero_guichet) },
        });

        if (existingGuichet) {
            errors.push("Le numéro de guichet existe déjà. Veuillez en choisir un autre.");
        }
    }

    // Vérification du status (doit être un booléen)
    if (!isBoolean(String(status))) {
        errors.push("Le status doit être true ou false.");
    }

    // Vérification du responsable (doit contenir entre 2 et 50 caractères)
    if (!isLength(responsable, { min: 2, max: 50 })) {
        errors.push("Le nom du responsable doit contenir entre 2 et 50 caractères.");
    }

    // Si des erreurs sont présentes, retourner une réponse d'erreur
    if (errors.length > 0) {
        return res.status(400).json({ errors });
    }

    next();
};

// Exportation par défaut
export default validateGuichetData;
