import { PrismaClient } from '@prisma/client';
import twilio from 'twilio';

const prisma = new PrismaClient();
const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

// Créer un ticket pour un client existant
const creerTicket = async (req, res) => {
  const { clientName } = req.body;

  try {
    // Trouver un guichet disponible
    const guichet = await prisma.guichet.findFirst();
    if (!guichet) {
      return res.status(400).json({ message: 'Aucun guichet disponible' });
    }

    // Créer un ticket pour le client
    const ticket = await prisma.ticket.create({
      data: {
        numero: `T-${Date.now()}`,
        clientName,
        guichetId: guichet.id,
      },
    });

    // Envoyer un SMS au client via Twilio
    await client.messages.create({
      body: `Votre ticket a été créé. Numéro: ${ticket.numero}`,
      from: process.env.TWILIO_PHONE_NUMBER, // Numéro Twilio
      to: '+12132795621', // Remplacer par le numéro du client
    });

    return res.status(201).json({ ticket });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erreur lors de la création du ticket' });
  }
};

// Récupérer tous les tickets
const getTickets = async (req, res) => {
  try {
    const tickets = await prisma.ticket.findMany();
    return res.status(200).json({ tickets });
  } catch (error) {
    return res.status(500).json({ message: 'Erreur lors de la récupération des tickets' });
  }
};

export { creerTicket, getTickets };
