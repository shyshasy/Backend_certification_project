import prisma from "../config/client.js";

// Get all utilisateurs
export const getAllUtilisateurs = async (req, res) => {
    try {
        const utilisateurs = await prisma.utilisateur.findMany();
        res.json(utilisateurs);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération des utilisateurs' });
    }
};

// Get utilisateur by ID
export const getUtilisateurById = async (req, res) => {
    const { id } = req.params;
    try {
        const utilisateur = await prisma.utilisateur.findUnique({ where: { id: Number(id) } });
        if (!utilisateur) {
            return res.status(404).json({ error: 'Utilisateur non trouvé' });
        }
        res.json(utilisateur);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération de l\'utilisateur' });
    }
};

// Create a new utilisateur
export const createUtilisateur = async (req, res) => {
    const { nom, role, email, status, password } = req.body;
    try {
        // Vérifier si l'email existe déjà
        const existingUtilisateur = await prisma.utilisateur.findUnique({
            where: { email }
        });

        if (existingUtilisateur) {
            return res.status(400).json({ error: 'L\'email existe déjà' });
        }

        const newUtilisateur = await prisma.utilisateur.create({
            data: { nom, role, email, status, password }
        });
        res.status(201).json("Utilisateur ajouté avec succès");
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la création de l\'utilisateur' });
    }
};

// Update utilisateur
export const updateUtilisateur = async (req, res) => {
    const { id } = req.params;
    const { nom, role, email, status, password } = req.body;
    try {
        const updatedUtilisateur = await prisma.utilisateur.update({
            where: { id: Number(id) },
            data: { nom, role, email, status, password }
        });
        res.status(200).json("Utilisateur modifié avec succès");
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la mise à jour de l\'utilisateur' });
    }
};

// Delete utilisateur
export const deleteUtilisateur = async (req, res) => {
    const { id } = req.params; // Récupérer l'ID de l'utilisateur
    console.log(`Suppression de l'utilisateur avec l'ID : ${id}`); // Pour le débogage

    if (!id || isNaN(id)) {
        return res.status(400).json({ error: 'ID invalide fourni.' });
    }

    try {
        const utilisateurExistant = await prisma.utilisateur.findUnique({
            where: { id: Number(id) },
        });

        if (!utilisateurExistant) {
            return res.status(404).json({ error: 'Utilisateur non trouvé. Aucune suppression effectuée.' });
        }

        const utilisateur = await prisma.utilisateur.delete({
            where: { id: Number(id) },
        });

        return res.status(200).json({ message: `L'utilisateur avec l'ID ${id} a été supprimé avec succès.` });
    } catch (error) {
        console.error('Erreur lors de la suppression de l\'utilisateur:', error);

        if (error.code === 'P2025') { // Code d'erreur de Prisma pour "Record to delete does not exist"
            return res.status(404).json({ error: 'Utilisateur non trouvé. Aucune suppression effectuée.' });
        }

        return res.status(500).json({ error: 'Impossible de supprimer un utilisateur ratachè à un client.' });
    }
};
