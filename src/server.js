// server.js

import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import { getTicketsEnAttente, traiterTicket, changerStatutTicket, calculerTempsAttenteEstime, notifierChangementStatut } from './controllers/ticketController.js';

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Middleware pour le traitement des requêtes
app.use(express.json());

// Routes pour récupérer les tickets et calculer le temps d'attente
app.get('/tickets', getTicketsEnAttente);
app.get('/temps-attente-estime', calculerTempsAttenteEstime);

// Route pour changer le statut d'un ticket
app.post('/changer-statuts', async (req, res) => {
  const { ticketId, nouveauStatut } = req.body;
  const ticket = await changerStatutTicket(ticketId, nouveauStatut);
  notifierChangementStatut(ticketId, nouveauStatut);  // Envoie de notification via WebSockets
  res.json(ticket);
});

// Initialiser les WebSockets
io.on('connection', (socket) => {
  console.log('Un client est connecté');
  
  socket.on('disconnect', () => {
    console.log('Client déconnecté');
  });
});

// Démarrer le serveur
server.listen(5002, () => {
  console.log('Serveur en écoute sur le port 3000');
});
