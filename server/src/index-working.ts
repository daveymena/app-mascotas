import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Base de datos en memoria para mascotas
let pets = [
    {
        id: '1',
        name: 'Max',
        species: 'Perro',
        breed: 'Golden Retriever',
        birthDate: '2020-05-15',
        weight: 25.5,
        imageUrl: '/placeholder.svg',
        microchipId: 'MC001234567',
        ownerId: '1234567890'
    },
    {
        id: '2',
        name: 'Luna',
        species: 'Gato',
        breed: 'Siamés',
        birthDate: '2021-03-10',
        weight: 4.2,
        imageUrl: '/placeholder.svg',
        microchipId: 'MC001234568',
        ownerId: '1234567890'
    }
];

// Rutas básicas
app.get('/', (req, res) => {
    res.json({ message: 'Pet Health Hub API is running successfully!' });
});

app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Ruta de login
app.post('/api/auth/login', (req, res) => {
    const { email, password } = req.body;
    
    if (email && password) {
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxMjM0NTY3ODkwIiwibmFtZSI6IlRlc3QgVXNlciIsImVtYWlsIjoiJyArIGVtYWlsICsgJyIsImlhdCI6MTUxNjIzOTAyMn0.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
        
        res.json({ 
            success: true, 
            message: 'Login successful',
            token: token,
            user: { 
                id: '1234567890',
                email: email, 
                name: 'Usuario de Prueba' 
            }
        });
    } else {
        res.status(400).json({ 
            success: false, 
            message: 'Email and password required' 
        });
    }
});

// RUTAS DE MASCOTAS
app.get('/api/pets', (req, res) => {
    console.log('GET /api/pets - Enviando mascotas:', pets);
    res.json(pets);
});

app.get('/api/pets/:id', (req, res) => {
    const pet = pets.find(p => p.id === req.params.id);
    if (!pet) {
        return res.status(404).json({ success: false, message: 'Mascota no encontrada' });
    }
    res.json(pet);
});

app.post('/api/pets', (req, res) => {
    console.log('POST /api/pets - Datos recibidos:', req.body);
    const { name, species, breed, birthDate, weight, microchipId } = req.body;
    
    if (!name || !species || !birthDate) {
        return res.status(400).json({ 
            success: false, 
            message: 'Nombre, especie y fecha de nacimiento son requeridos' 
        });
    }
    
    const newPet = {
        id: Date.now().toString(),
        name,
        species,
        breed: breed || '',
        birthDate,
        weight: weight ? parseFloat(weight) : null,
        microchipId: microchipId || '',
        imageUrl: '/placeholder.svg',
        ownerId: '1234567890'
    };
    
    pets.push(newPet);
    console.log('Mascota creada:', newPet);
    
    res.status(201).json({ 
        success: true, 
        message: 'Mascota creada exitosamente',
        pet: newPet
    });
});

app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
    console.log(`📍 API available at: http://localhost:${PORT}`);
    console.log('📋 Available endpoints:');
    console.log('  GET  / - Health check');
    console.log('  GET  /api/health - API health');
    console.log('  POST /api/auth/login - Login');
    console.log('  GET  /api/pets - Get all pets');
    console.log('  POST /api/pets - Create pet');
});