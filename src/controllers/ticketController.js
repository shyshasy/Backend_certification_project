import prisma from "../config/client.js";

// Get all tickets
export const getAllTickets = async (req, res) => {
    try {
        const tickets = await prisma.ticket.findMany({
            include: {
                guichet: true,
                utilisateur: true,
            }
        });
        res.json(tickets);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération des tickets' });
    }
};

// Get ticket by ID
export const getTicketById = async (req, res) => {
    const { id } = req.params;
    try {
        const ticket = await prisma.ticket.findUnique({
            where: { id: Number(id) },
            include: {
                guichet: true,
                utilisateur: true,
            }
        });
        if (!ticket) {
            return res.status(404).json({ error: 'Ticket non trouvé' });
        }
        res.json(ticket);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération du ticket' });
    }
};

// Create a new ticket
export const createTicket = async (req, res) => {
    const { statut, date_heure_creation, numero, guichet_id, utilisateur_id } = req.body;
    try {
        const newTicket = await prisma.ticket.create({
            data: { statut, date_heure_creation, numero, guichet_id, utilisateur_id }
        });
        res.status(201).json("Ticket ajouter avec succès");
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la création du ticket' });
    }
};

// Update ticket
export const updateTicket = async (req, res) => {
    const { id } = req.params;
    const { statut, date_heure_creation, numero, guichet_id, utilisateur_id } = req.body;
    try {
        const updatedTicket = await prisma.ticket.update({
            where: { id: Number(id) },
            data: { statut, date_heure_creation, numero, guichet_id, utilisateur_id }
        });
        res.status(201).json("Ticket modifiè avec succès");
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la mise à jour du ticket' });
    }
};

// Delete ticket
export const deleteTicket = async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.ticket.delete({ where: { id: Number(id) } });
        res.status(201).json("Supprimer avec succès");
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la suppression du ticket' });
    }
};
