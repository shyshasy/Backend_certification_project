import prisma from "../config/client.js";

// Get all guichets
export const getAllGuichets = async (req, res) => {
    try {
        const guichets = await prisma.guichet.findMany();
        // Convertir le statut booléen en texte
        const guichetsWithStatus = guichets.map(guichet => ({
            ...guichet,
            status: guichet.statut ? 'Ouvert' : 'Fermé' // Assurez-vous que le statut est un booléen
        }));
        res.json(guichetsWithStatus);
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
        // Conversion du statut en texte ("Ouvert"/"Fermé")
        guichet.status = guichet.statut ? 'Ouvert' : 'Fermé';
        res.json(guichet);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération du guichet' });
    }
};

// Create a new guichet
export const createGuichet = async (req, res) => {
    const { numero_guichet, status, responsable } = req.body;
    const statutBool = (status === 'true' || status === true); // Convertir le status en booléen

    try {
        const newGuichet = await prisma.guichet.create({
            data: { 
                numero_guichet, 
                statut: statutBool, // Utilisation du statut booléen
                responsable 
            }
        });
        res.status(201).json("Guichet ajouté avec succès");
    } catch (error) {
        console.error("Erreur détaillée:", error);
        res.status(500).json({ error: `Erreur lors de la création du guichet: ${error.message}` });
    }
};

// Update guichet
export const updateGuichet = async (req, res) => {
    const { id } = req.params;
    const { numero_guichet, status, responsable } = req.body;
    const statutBool = (status === 'true' || status === true); // Conversion du statut en booléen

    try {
        // Vérification si le guichet existe
        const existingGuichet = await prisma.guichet.findUnique({
            where: { id: Number(id) }
        });

        if (!existingGuichet) {
            return res.status(404).json({ error: 'Guichet non trouvé' });
        }

        // Mise à jour du guichet
        await prisma.guichet.update({
            where: { id: Number(id) },
            data: { 
                numero_guichet, 
                statut: statutBool, 
                responsable 
            }
        });
        res.status(200).json("Guichet modifié avec succès");
    } catch (error) {
        console.error("Erreur lors de la mise à jour du guichet :", error);
        res.status(500).json({ error: `Erreur lors de la mise à jour du guichet: ${error.message}` });
    }
};

// Delete guichet
export const deleteGuichet = async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.guichet.delete({ where: { id: Number(id) } });
        res.status(200).send("Supprimé avec succès");
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la suppression du guichet' });
    }
};
