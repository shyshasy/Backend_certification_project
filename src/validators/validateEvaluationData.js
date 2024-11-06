import validator from 'validator';

const { isInt, isLength, isDate } = validator;

export const validateEvaluationData = async (req, res, next) => {
    const { satis_score, date_evaluation, commentaire } = req.body;
    let errors = [];

    // Validation de la note de satisfaction (satis_score)
    const score = parseInt(satis_score, 10);
    
    // Vérifiez si la conversion a échoué
    if (isNaN(score)) {
        errors.push("La note doit être un entier compris entre 0 et 20.");
    } else if (!isInt(String(score), { min: 0, max: 20 })) {
        errors.push("La note doit être un entier compris entre 0 et 20.");
    }

    // Validation de la date (date_evaluation)
    if (!isDate(date_evaluation, { format: 'YYYY-MM-DD', strictMode: true })) {
        errors.push("La date doit être une date valide au format AAAA-MM-JJ.");
    }

    // Validation de la longueur du commentaire
    if (!isLength(commentaire, { min: 5, max: 500 })) {
        errors.push("Le commentaire doit avoir entre 5 et 500 caractères.");
    }

    // Si des erreurs sont présentes, retourner une réponse d'erreur
    if (errors.length > 0) {
        return res.status(400).json({ errors });
    }

    // Si tout est valide, passer au middleware suivant
    next();
};
