import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import utilisateurRoutes from './src/routes/utilisateurRoutes.js'; // Chemin vers les routes des utilisateurs
import guichetRoutes from './src/routes/guichetRoutes.js'; // Chemin vers les routes des guichets
import ticketRoutes from './src/routes/ticketRoutes.js'; 
import evaluationRoutes from './src/routes/evaluationRoutes.js'; 
import authrouter from './src/routes/authRoute.js';
import { fileAttenteRoutes } from './src/routes/fileAttenteRoutes.js';

const app = express();
const PORT = process.env.PORT || 5002;

const corsOption = {
    origin: "*", optionSuccessStatus: 200
}
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

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
