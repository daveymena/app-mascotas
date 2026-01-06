import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth';
import petRoutes from './routes/pets';
import appointmentRoutes from './routes/appointments';
import medicalRoutes from './routes/medical';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/pets', petRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/medical', medicalRoutes);

app.get('/', (req, res) => {
    res.send('Pet Health Hub API is running');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
