import sendSms from '../../sendMessage.mjs';  // Importation correcte de la fonction sendSms
import prisma from "../config/client.js";  // Votre client Prisma

export const createTicket = async (req, res) => {
  try {
    const { nom, telephone, statut, guichet_id, utilisateur_id } = req.body;

    const maxTicket = await prisma.ticket.findMany({
      orderBy: {
        numero: 'desc',
      },
      take: 1,
    });

    const num = maxTicket[0]?.numero + 1 || 1;
    console.log("Le numéro maximum est:", num);

    // Créer le ticket
    const newTicket = await prisma.ticket.create({
      data: {
        nom,
        telephone: telephone.toString(),
        numero: Number(num),
        statut,
        date_heure_creation: new Date().toISOString(),
        guichet: {
          connect: { id: parseInt(guichet_id) },
        },
        utilisateur: {
          connect: { id: parseInt(utilisateur_id) },
        },
      },
    });

    // Envoyer le SMS après création
    try {
      await sendSms({
        to: telephone,
        body: `Bonjour ${nom}, votre ticket numéro ${num} a été créé avec succès. Veuillez patienter jusqu'à votre tour.`,
      });
      console.log("SMS envoyé avec succès");
    } catch (smsError) {
      console.error("Erreur lors de l'envoi du SMS:", smsError);
    }

    res.status(201).json(newTicket);
  } catch (error) {
    console.error("Erreur lors de la création du ticket:", error);
    const errorMessage = error.message || "Erreur lors de la création du ticket";
    res.status(500).json({ error: errorMessage, details: error });
  }
};


// Obtenir tous les tickets
export const getAllTickets = async (req, res) => {
  try {
    const tickets = await prisma.ticket.findMany({
      include: {
        guichet: true, // Inclut les informations du guichet
        utilisateur: true // Inclut les informations de l'utilisateur
      }
    });
    res.status(200).json(tickets);
  } catch (error) {
    console.error("Erreur lors de la récupération des tickets:", error);
    const errorMessage = error.message || "Erreur lors de la récupération des tickets";
    res.status(500).json({ error: errorMessage, details: error });
  }
};

// Obtenir un ticket par son id
export const getTicketById = async (req, res) => {
  try {
    const { id } = req.params;
    const ticket = await prisma.ticket.findUnique({
      where: { id: parseInt(id) },
      include: {
        guichet: true, // Inclut les informations du guichet
        utilisateur: true // Inclut les informations de l'utilisateur
      }
    });

    if (!ticket) {
      return res.status(404).json({ error: "Ticket non trouvé" });
    }

    res.status(200).json(ticket);
  } catch (error) {
    console.error("Erreur lors de la récupération du ticket:", error);
    const errorMessage = error.message || "Erreur lors de la récupération du ticket";
    res.status(500).json({ error: errorMessage, details: error });
  }
};

// Mettre à jour un ticket
export const updateTicket = async (req, res) => {
  try {
    const { id } = req.params;
    const { nom, telephone, statut, guichet_id } = req.body;

    // Vérification que l'ID du ticket existe
    const ticketExist = await prisma.ticket.findUnique({ where: { id: parseInt(id) } });
    if (!ticketExist) {
      return res.status(404).json({ error: "Ticket non trouvé" });
    }

    const updatedTicket = await prisma.ticket.update({
      where: { id: parseInt(id) },
      data: {
        nom,
        telephone: parseInt(telephone, 10),
        statut,
        guichet: { connect: { id: parseInt(guichet_id) } }, // Mettre à jour le guichet
      }
    });

    res.status(200).json(updatedTicket);
  } catch (error) {
    console.error("Erreur lors de la mise à jour du ticket:", error);
    const errorMessage = error.message || "Erreur lors de la mise à jour du ticket";
    res.status(500).json({ error: errorMessage, details: error });
  }
};

// Supprimer un ticket
export const deleteTicket = async (req, res) => {
  try {
    const { id } = req.params;

    // Vérification que l'ID du ticket existe
    const ticketExist = await prisma.ticket.findUnique({ where: { id: parseInt(id) } });
    if (!ticketExist) {
      return res.status(404).json({ error: "Ticket non trouvé" });
    }

    const deletedTicket = await prisma.ticket.delete({
      where: { id: parseInt(id) }
    });

    res.status(200).json({ message: "Ticket supprimé avec succès", ticket: deletedTicket });
  } catch (error) {
    console.error("Erreur lors de la suppression du ticket:", error);
    const errorMessage = error.message || "Erreur lors de la suppression du ticket";
    res.status(500).json({ error: errorMessage, details: error });
  }
};
/// sendMessage.mjs
// sendMessage.mjs


