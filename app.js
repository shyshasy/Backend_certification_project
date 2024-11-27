import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import utilisateurRoutes from './src/routes/utilisateurRoutes.js'; // Chemin vers les routes des utilisateurs
import guichetRoutes from './src/routes/guichetRoutes.js'; // Chemin vers les routes des guichets
import ticketRoutes from './src/routes/ticketRoutes.js'; 
import evaluationRoutes from './src/routes/evaluationRoutes.js'; 
import authrouter from './src/routes/authRoutes.js';
import { fileAttenteRoutes } from './src/routes/fileAttenteRoutes.js';
// import { sendSmsNotification } from './src/services/smsService.js'; 
import dotenv from 'dotenv';
import reportingRoutes from './src/routes/reportingRoutes.js';
// Charge les variables d'environnement
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5002;
const corsOption = {
  origin: 'http://localhost:5173', // Remplace par l'URL de ton frontend
  optionSuccessStatus: 200
};


// Middleware
app.use(helmet()); // Sécurise les en-têtes HTTP
app.use(cors(corsOption)); // Active CORS pour toutes les routes
app.use(express.json()); // Middleware pour parser le JSON

// Routes
app.use('/api', utilisateurRoutes);
app.use('/api', guichetRoutes);
app.use('/api', ticketRoutes);
app.use('/api', evaluationRoutes);
app.use('/api', authrouter);
app.use('/api', fileAttenteRoutes);
app.use('/api', reportingRoutes);

// Route pour envoyer un SMS de notification
app.post('/api/notify', (req, res) => {
  const { utilisateurId, ticketNumber } = req.body;
  
  // Recherche l'utilisateur dans la base de données (supposons qu'il a un champ 'phoneNumber')
  const utilisateur = findUtilisateurById(utilisateurId); // Remplace par ta logique d'accès à la DB
  
  if (utilisateur) {
    const phoneNumber = utilisateur.phoneNumber;
    const message = `Votre tour approche, votre numéro de ticket est : ${ticketNumber}`;
    
    // Envoi du SMS
    sendSmsNotification(phoneNumber, message);

    res.status(200).send('Notification SMS envoyée.');
  } else {
    res.status(404).send('Utilisateur non trouvé.');
  }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
