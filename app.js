import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import utilisateurRoutes from './src/routes/utilisateurRoutes.js'; // Chemin vers les routes des utilisateurs
import guichetRoutes from './src/routes/guichetRoutes.js'; // Chemin vers les routes des guichets
import ticketRoutes from './src/routes/ticketRoutes.js'; // Chemin vers les routes des tickets
import evaluationRoutes from './src/routes/evaluationRoutes.js'; // Chemin vers les routes des évaluations

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet()); // Sécurise les en-têtes HTTP
app.use(cors()); // Active CORS pour toutes les routes
app.use(express.json()); // Middleware pour parser le JSON

// Routes
app.use('/api', utilisateurRoutes);
app.use('/api', guichetRoutes);
app.use('/api', ticketRoutes);
app.use('/api', evaluationRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
