import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

// Rotas
import authRoutes from './routes/Auth.routes';
import userRoutes from './routes/User.routes';
import restaurantRoutes from './routes/Restaurant.routes';
import tableRoutes from './routes/Table.routes';
import reservationRoutes from './routes/Reservation.routes';
import adminRoutes from './routes/admin.routes';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/erp';

// Definindo rotas principais
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/restaurantes', restaurantRoutes);
app.use('/api/mesas', tableRoutes);
app.use('/api/reservas', reservationRoutes);
app.use('/api/admin', adminRoutes);

// Conexão com o MongoDB e início do servidor
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('MongoDB conectado');
    app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
  })
  .catch((err) => console.error('Erro ao conectar no MongoDB:', err));
