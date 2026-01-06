const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3001;

// Middleware
app.use(cors({
    origin: 'http://localhost:8080',
    credentials: true
}));
app.use(express.json());

// Datos de prueba
const pets = [
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

const appointments = [
    {
        id: '1',
        petId: '1',
        petName: 'Max',
        date: '2024-02-15',
        time: '10:00',
        type: 'Consulta general',
        veterinarian: 'Dr. García',
        clinic: 'Clínica Veterinaria Central',
        notes: 'Revisión rutinaria',
        status: 'scheduled'
    }
];

const vaccines = [
    {
        id: '1',
        petId: '1',
        petName: 'Max',
        name: 'Rabia',
        date: '2023-06-15',
        nextDueDate: '2024-06-15',
        veterinarian: 'Dr. García',
        batchNumber: 'VAC123456',
        notes: 'Vacuna anual contra la rabia'
    }
];

// Rutas básicas
app.get('/', (req, res) => {
    res.json({ message: 'Pet Health Hub API funcionando en puerto 3001!' });
});

app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Auth
app.post('/api/auth/login', (req, res) => {
    const { email, password } = req.body;
    
    if (email && password) {
        res.json({ 
            success: true, 
            message: 'Login successful',
            token: 'test-token-123',
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

// Mascotas
app.get('/api/pets', (req, res) => {
    console.log('✅ GET /api/pets - Enviando mascotas');
    res.json(pets);
});

app.post('/api/pets', (req, res) => {
    console.log('✅ POST /api/pets - Datos:', req.body);
    const newPet = {
        id: Date.now().toString(),
        ...req.body,
        imageUrl: '/placeholder.svg',
        ownerId: '1234567890'
    };
    pets.push(newPet);
    res.status(201).json({ 
        success: true, 
        message: 'Mascota creada exitosamente',
        pet: newPet
    });
});

// Citas
app.get('/api/appointments', (req, res) => {
    console.log('✅ GET /api/appointments');
    res.json(appointments);
});

app.post('/api/appointments', (req, res) => {
    console.log('✅ POST /api/appointments - Datos:', req.body);
    const newAppointment = {
        id: Date.now().toString(),
        ...req.body,
        status: 'scheduled'
    };
    appointments.push(newAppointment);
    res.status(201).json({ 
        success: true, 
        message: 'Cita creada exitosamente',
        appointment: newAppointment
    });
});

// Vacunas
app.get('/api/vaccines', (req, res) => {
    console.log('✅ GET /api/vaccines');
    res.json(vaccines);
});

app.post('/api/vaccines', (req, res) => {
    console.log('✅ POST /api/vaccines - Datos:', req.body);
    const newVaccine = {
        id: Date.now().toString(),
        ...req.body
    };
    vaccines.push(newVaccine);
    res.status(201).json({ 
        success: true, 
        message: 'Vacuna registrada exitosamente',
        vaccine: newVaccine
    });
});

// Desparasitaciones
app.get('/api/dewormings', (req, res) => {
    console.log('✅ GET /api/dewormings');
    res.json([]);
});

app.post('/api/dewormings', (req, res) => {
    console.log('✅ POST /api/dewormings - Datos:', req.body);
    res.status(201).json({ 
        success: true, 
        message: 'Desparasitación registrada exitosamente'
    });
});

// Alergias
app.get('/api/allergies', (req, res) => {
    console.log('✅ GET /api/allergies');
    res.json([]);
});

app.post('/api/allergies', (req, res) => {
    console.log('✅ POST /api/allergies - Datos:', req.body);
    res.status(201).json({ 
        success: true, 
        message: 'Alergia registrada exitosamente'
    });
});

app.listen(PORT, () => {
    console.log(`🚀 Servidor funcionando en puerto ${PORT}`);
    console.log(`📍 API: http://localhost:${PORT}`);
    console.log('📋 Endpoints disponibles:');
    console.log('  GET  /api/pets');
    console.log('  POST /api/pets');
    console.log('  GET  /api/appointments');
    console.log('  POST /api/appointments');
    console.log('  GET  /api/vaccines');
    console.log('  POST /api/vaccines');
});