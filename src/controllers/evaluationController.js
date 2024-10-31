import prisma from "../config/client.js";


// Get all evaluations
export const getAllEvaluations = async (req, res) => {
    try {
        const evaluations = await prisma.evaluation.findMany({
            include: {
                utilisateur: true,
            }
        });
        res.json(evaluations);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération des évaluations' });
    }
};

// Get evaluation by ID
export const getEvaluationById = async (req, res) => {
    const { id } = req.params;
    try {
        const evaluation = await prisma.evaluation.findUnique({
            where: { id: Number(id) },
            include: {
                utilisateur: true,
            }
        });
        if (!evaluation) {
            return res.status(404).json({ error: 'Évaluation non trouvée' });
        }
        res.json(evaluation);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération de l\'évaluation' });
    }
};

// Create a new evaluation
export const createEvaluation = async (req, res) => {
    const { satis_score, commentaire, date_evaluation, utilisateur_id } = req.body;
    try {
        const newEvaluation = await prisma.evaluation.create({
            data: { satis_score, commentaire, date_evaluation, utilisateur_id }
        });
        res.status(201).json("Evalution ajouter avec succès");
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la création de l\'évaluation' });
    }
};

// Update evaluation
export const updateEvaluation = async (req, res) => {
    const { id } = req.params;
    const { satis_score, commentaire, date_evaluation, utilisateur_id } = req.body;

    try {
        const updatedEvaluation = await prisma.evaluation.update({
            
 
where: { id: Number(id) },
            data: { satis_score, commentaire, date_evaluation: new Date(date_evaluation), utilisateur_id }
        });

        res.status(200).json({ message: "Modification réussie"});
    } 
    
catch (error) {
        const errorMessage = error.code === 'P2025' ? 'Évaluation non trouvée.' : 'Erreur lors de la mise à jour.';
        res.status(500).json({ error: errorMessage });
    }
};

// Delete evaluation
export const deleteEvaluation = async (req, res) => {
    const { id } = req.params;
    try {
        // Essayer de supprimer l'évaluation
        await prisma.evaluation.delete({ where: { id: Number(id) } });

        // Si l'évaluation a été trouvée et supprimée, on envoie un message de succès
        res.status(200).json({ message: `L'évaluation avec l'ID ${id} a été supprimée avec succès.` });
    } catch (error) {
        // Pour toutes les erreurs, renvoyer un message générique
        res.status(500).json({ error: 'Une erreur est survenue lors de la suppression.' });
    }
};
