import express from 'express';
import cors from 'cors';
import guitarsRoutes from './routes/guitars.routes.js';
import authRoutes from './routes/auth.routes.js';

const app = express();

app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

app.use('/api/guitars', guitarsRoutes);
app.use('/auth', authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});




