// src/controllers/fileAttenteController.js

// Exemple de fonction pour récupérer les tickets
const getTickets = async (req, res) => {
    try {
      const tickets = await prisma.ticket.findMany(); // Exemple avec Prisma, selon votre DB
      res.status(200).json(tickets);
    } catch (error) {
      res.status(500).json({ message: 'Erreur lors de la récupération des tickets' });
    }
  };
  
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
        from: process.env.TWILIO_PHONE_NUMBER,
        to: '+12132795621', // Remplacer par le numéro du client
      });
  
      return res.status(201).json({ ticket });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Erreur lors de la création du ticket' });
    }
  };
  
  // Exporter les fonctions
  export { creerTicket, getTickets };
  