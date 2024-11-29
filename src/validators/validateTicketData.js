import express from 'express';
import { PrismaClient } from '@prisma/client';

import validator from 'validator'; // Assurez-vous que ce module est installé
const { isEmail, isLength } = validator;
const app = express();
app.use(express.json());
const prisma = new PrismaClient();

// Fonction pour valider les données du ticket
const validateTicketData = (data) => {
  const { nom, telephone, statut, guichet_id, utilisateur_id } = data;
  let errors = [];

  // Vérification de la présence des champs requis
  if (!nom || !telephone || !statut || !guichet_id || !utilisateur_id) {
    errors.push('Tous les champs sont obligatoires.');
  }

  // Vérification du numéro de téléphone
  const phonePattern = /^[234]\d{7}$/; // Le numéro doit commencer par 2, 3 ou 4, suivi de 7 chiffres
  if (!phonePattern.test(telephone)) {
    errors.push('Le numéro de téléphone doit commencer par 2, 3 ou 4 et contenir exactement 8 chiffres.');
  }

  // Si des erreurs sont présentes, retourner le tableau des erreurs
  return errors.length ? errors : null;
};

// Créer un ticket
export const createTicket = async (req, res) => {
  try {
    const { nom, telephone, statut, guichet_id, utilisateur_id } = req.body;

    // Valider les données du ticket
    const validationErrors = validateTicketData(req.body);
    if (validationErrors) {
      return res.status(400).json({ errors: validationErrors });
    }

    // Générer le numéro de ticket
    const ticketCount = await prisma.ticket.count();
    let newTicketNumber = ticketCount + 1; // Le numéro de ticket est le nombre total de tickets + 1

    // Vérifier si le numéro de ticket est déjà existant
    let existingTicket;
    do {
      existingTicket = await prisma.ticket.findFirst({
        where: { numero: newTicketNumber },
      });
      if (existingTicket) {
        newTicketNumber += 1; // Incrémentez jusqu'à ce que le numéro soit unique
      }
    } while (existingTicket);

    // Créer un nouveau ticket avec les informations fournies
    const newTicket = await prisma.ticket.create({
      data: {
        nom,
        telephone, // Conserver le téléphone sous forme de chaîne
        numero: newTicketNumber, // Assigner le numéro de ticket généré
        statut,
        date_heure_creation: new Date().toISOString(), // Date et heure locale sous format ISO 8601 valide
        guichet: {
          connect: { id: parseInt(guichet_id) } // Connexion au guichet par son ID
        },
        utilisateur: {
          connect: { id: parseInt(utilisateur_id) } // Connexion à l'utilisateur par son ID
        }
      }
    });

    // Envoyer le ticket créé en réponse
    res.status(201).json(newTicket);
  } catch (error) {
    console.error("Erreur lors de la création du ticket:", error);
    res.status(500).json({ error: error.message || "Erreur lors de la création du ticket" });
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
    res.status(500).json({ error: error.message || "Erreur lors de la récupération des tickets" });
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
    res.status(500).json({ error: error.message || "Erreur lors de la récupération du ticket" });
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
        telephone, // Garder le téléphone comme chaîne
        statut,
        guichet: { connect: { id: parseInt(guichet_id) } }, // Mettre à jour le guichet
      }
    });

    res.status(200).json(updatedTicket);
  } catch (error) {
    console.error("Erreur lors de la mise à jour du ticket:", error);
    res.status(500).json({ error: error.message || "Erreur lors de la mise à jour du ticket" });
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
    res.status(500).json({ error: error.message || "Erreur lors de la suppression du ticket" });
  }
};

// Middleware de gestion des erreurs non capturées
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: err.message || 'Erreur serveur interne' });
});

// Lancer l'application sur le port 3000
app.listen(5002, () => {
  console.log('Serveur démarré sur le port 3000');
});
