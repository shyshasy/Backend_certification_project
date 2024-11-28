// Importer Express et la fonction d'envoi de SMS
import express from 'express';
import { sendSmsNotification } from './twilioService.js'; // Importer la fonction d'envoi

const app = express();
app.use(express.json());

// Exemple d'API pour changer le statut du ticket et envoyer un SMS
app.post('/api/tickets/:id/status', async (req, res) => {
  const { status } = req.body;
  const ticket = findTicketById(req.params.id); // Implémentez cette fonction pour récupérer un ticket

  if (!ticket) {
    return res.status(404).json({ message: 'Ticket non trouvé' });
  }

  // Mettre à jour le statut du ticket
  ticket.status = status;

  // Envoyer un SMS si le statut passe à "En cours"
  if (status === 'En cours') {
    const message = `Bonjour ${ticket.nom}, votre tour approche. Veuillez vous rendre au guichet ${ticket.guichet.numero}.`;
    try {
      await sendSmsNotification(ticket.telephone, message);
      res.json({ message: 'Statut mis à jour et SMS envoyé' });
    } catch (error) {
      res.status(500).json({ message: 'Erreur lors de l\'envoi du SMS' });
    }
  } else {
    res.json({ message: 'Statut mis à jour' });
  }
});

// Fonction fictive pour récupérer un ticket
const findTicketById = (id) => {
  // Cette fonction est un placeholder, implémentez-la selon votre logique
  return { id, nom: 'Aichetou', telephone: '49900343', guichet: { numero: 5 } };
};

// Démarrer le serveur
const PORT = process.env.PORT || 5002;
app.listen(PORT, () => {
  console.log(`Serveur backend démarré sur le port ${PORT}`);
});
