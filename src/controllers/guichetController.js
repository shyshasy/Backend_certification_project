import prisma from "../config/client.js";


// Get all guichets
export const getAllGuichets = async (req, res) => {
    try {
        const guichets = await prisma.guichet.findMany();
        res.json(guichets);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération des guichets' });
    }
};

// Get guichet by ID
export const getGuichetById = async (req, res) => {
    const { id } = req.params;
    try {
        const guichet = await prisma.guichet.findUnique({ where: { id: Number(id) } });
        if (!guichet) {
            return res.status(404).json({ error: 'Guichet non trouvé' });
        }
        res.json(guichet);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération du guichet' });
    }
};

// Create a new guichet
export const createGuichet = async (req, res) => {
    const { numero_guichet, statut, responsable } = req.body;
    try {
        const newGuichet = await prisma.guichet.create({
            data: { numero_guichet, statut, responsable }
        });
        res.status(201).json("Guichet ajouter avec succès");
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la création du guichet' });
    }
};

// Update guichet
export const updateGuichet = async (req, res) => {
    const { id } = req.params;
    const { numero_guichet, statut, responsable } = req.body;
    try {
        const updatedGuichet = await prisma.guichet.update({
            where: { id: Number(id) },
            data: { numero_guichet, statut, responsable }
        });
        res.status(201).json("Guichet modifiè avec succès");
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la mise à jour du guichet' });
    }
};

// Delete guichet
export const deleteGuichet = async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.guichet.delete({ where: { id: Number(id) } });
        res.status(200).send("Supprimer avec succès");
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la suppression du guichet' });
    }
};
