const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Servir archivos estáticos del frontend
app.use(express.static(path.join(__dirname, '../../dist')));

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

// Base de datos en memoria para citas
let appointments = [
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
    },
    {
        id: '2',
        petId: '2',
        petName: 'Luna',
        date: '2024-02-20',
        time: '14:30',
        type: 'Vacunación',
        veterinarian: 'Dra. Martínez',
        clinic: 'Clínica Veterinaria Central',
        notes: 'Vacuna anual',
        status: 'scheduled'
    }
];

// Base de datos en memoria para vacunas
let vaccines = [
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
    },
    {
        id: '2',
        petId: '1',
        petName: 'Max',
        name: 'Parvovirus',
        date: '2023-07-10',
        nextDueDate: '2024-07-10',
        veterinarian: 'Dr. García',
        batchNumber: 'VAC789012',
        notes: 'Vacuna contra parvovirus'
    }
];

// Base de datos en memoria para desparasitaciones
let dewormings = [
    {
        id: '1',
        petId: '1',
        petName: 'Max',
        productName: 'Drontal Plus',
        date: '2023-08-15',
        nextDueDate: '2024-02-15',
        veterinarian: 'Dr. García',
        dosage: '1 tableta',
        notes: 'Desparasitación semestral'
    },
    {
        id: '2',
        petId: '2',
        petName: 'Luna',
        productName: 'Milbemax',
        date: '2023-09-10',
        nextDueDate: '2024-03-10',
        veterinarian: 'Dra. Martínez',
        dosage: '0.5 tableta',
        notes: 'Desparasitación para gatos'
    }
];

// Base de datos en memoria para alergias
let allergies = [
    {
        id: '1',
        petId: '1',
        petName: 'Max',
        allergen: 'Polen de gramíneas',
        severity: 'Moderada',
        symptoms: ['Picazón', 'Estornudos', 'Ojos llorosos'],
        diagnosedDate: '2023-05-20',
        treatment: 'Antihistamínicos',
        notes: 'Evitar paseos en primavera temprano'
    },
    {
        id: '2',
        petId: '2',
        petName: 'Luna',
        allergen: 'Pollo',
        severity: 'Leve',
        symptoms: ['Vómitos ocasionales', 'Diarrea'],
        diagnosedDate: '2023-07-15',
        treatment: 'Dieta hipoalergénica',
        notes: 'Cambio a alimento sin pollo'
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

// RUTAS DE CITAS
app.get('/api/appointments', (req, res) => {
    console.log('GET /api/appointments - Enviando citas:', appointments);
    res.json(appointments);
});

app.get('/api/appointments/pet/:petId', (req, res) => {
    const petAppointments = appointments.filter(a => a.petId === req.params.petId);
    res.json(petAppointments);
});

app.post('/api/appointments', (req, res) => {
    console.log('POST /api/appointments - Datos recibidos:', req.body);
    const { petId, date, time, type, veterinarian, clinic, notes } = req.body;
    
    if (!petId || !date || !time || !type) {
        return res.status(400).json({ 
            success: false, 
            message: 'Mascota, fecha, hora y tipo de cita son requeridos' 
        });
    }
    
    const pet = pets.find(p => p.id === petId);
    const petName = pet ? pet.name : 'Mascota desconocida';
    
    const newAppointment = {
        id: Date.now().toString(),
        petId,
        petName,
        date,
        time,
        type,
        veterinarian: veterinarian || '',
        clinic: clinic || '',
        notes: notes || '',
        status: 'scheduled'
    };
    
    appointments.push(newAppointment);
    console.log('Cita creada:', newAppointment);
    
    res.status(201).json({ 
        success: true, 
        message: 'Cita agendada exitosamente',
        appointment: newAppointment
    });
});

// RUTAS DE VACUNAS
app.get('/api/vaccines', (req, res) => {
    console.log('GET /api/vaccines - Enviando vacunas:', vaccines);
    res.json(vaccines);
});

app.get('/api/vaccines/pet/:petId', (req, res) => {
    const petVaccines = vaccines.filter(v => v.petId === req.params.petId);
    res.json(petVaccines);
});

app.post('/api/vaccines', (req, res) => {
    console.log('POST /api/vaccines - Datos recibidos:', req.body);
    const { petId, name, date, nextDueDate, veterinarian, batchNumber, notes } = req.body;
    
    if (!petId || !name || !date) {
        return res.status(400).json({ 
            success: false, 
            message: 'Mascota, nombre de vacuna y fecha son requeridos' 
        });
    }
    
    const pet = pets.find(p => p.id === petId);
    const petName = pet ? pet.name : 'Mascota desconocida';
    
    const newVaccine = {
        id: Date.now().toString(),
        petId,
        petName,
        name,
        date,
        nextDueDate: nextDueDate || null,
        veterinarian: veterinarian || '',
        batchNumber: batchNumber || '',
        notes: notes || ''
    };
    
    vaccines.push(newVaccine);
    console.log('Vacuna registrada:', newVaccine);
    
    res.status(201).json({ 
        success: true, 
        message: 'Vacuna registrada exitosamente',
        vaccine: newVaccine
    });
});

// RUTAS DE DESPARASITACIONES
app.get('/api/dewormings', (req, res) => {
    console.log('GET /api/dewormings - Enviando desparasitaciones:', dewormings);
    res.json(dewormings);
});

app.get('/api/dewormings/pet/:petId', (req, res) => {
    const petDewormings = dewormings.filter(d => d.petId === req.params.petId);
    res.json(petDewormings);
});

app.post('/api/dewormings', (req, res) => {
    console.log('POST /api/dewormings - Datos recibidos:', req.body);
    const { petId, productName, date, nextDueDate, veterinarian, dosage, notes } = req.body;
    
    if (!petId || !productName || !date) {
        return res.status(400).json({ 
            success: false, 
            message: 'Mascota, producto y fecha son requeridos' 
        });
    }
    
    const pet = pets.find(p => p.id === petId);
    const petName = pet ? pet.name : 'Mascota desconocida';
    
    const newDeworming = {
        id: Date.now().toString(),
        petId,
        petName,
        productName,
        date,
        nextDueDate: nextDueDate || null,
        veterinarian: veterinarian || '',
        dosage: dosage || '',
        notes: notes || ''
    };
    
    dewormings.push(newDeworming);
    console.log('Desparasitación registrada:', newDeworming);
    
    res.status(201).json({ 
        success: true, 
        message: 'Desparasitación registrada exitosamente',
        deworming: newDeworming
    });
});

// RUTAS DE ALERGIAS
app.get('/api/allergies', (req, res) => {
    console.log('GET /api/allergies - Enviando alergias:', allergies);
    res.json(allergies);
});

app.get('/api/allergies/pet/:petId', (req, res) => {
    const petAllergies = allergies.filter(a => a.petId === req.params.petId);
    res.json(petAllergies);
});

app.post('/api/allergies', (req, res) => {
    console.log('POST /api/allergies - Datos recibidos:', req.body);
    const { petId, allergen, severity, symptoms, diagnosedDate, treatment, notes } = req.body;
    
    if (!petId || !allergen || !severity) {
        return res.status(400).json({ 
            success: false, 
            message: 'Mascota, alérgeno y severidad son requeridos' 
        });
    }
    
    const pet = pets.find(p => p.id === petId);
    const petName = pet ? pet.name : 'Mascota desconocida';
    
    const newAllergy = {
        id: Date.now().toString(),
        petId,
        petName,
        allergen,
        severity,
        symptoms: Array.isArray(symptoms) ? symptoms : [symptoms],
        diagnosedDate: diagnosedDate || new Date().toISOString().split('T')[0],
        treatment: treatment || '',
        notes: notes || ''
    };
    
    allergies.push(newAllergy);
    console.log('Alergia registrada:', newAllergy);
    
    res.status(201).json({ 
        success: true, 
        message: 'Alergia registrada exitosamente',
        allergy: newAllergy
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
    console.log('  GET  /api/appointments - Get all appointments');
    console.log('  POST /api/appointments - Create appointment');
    console.log('  GET  /api/vaccines - Get all vaccines');
    console.log('  POST /api/vaccines - Create vaccine');
    console.log('  GET  /api/dewormings - Get all dewormings');
    console.log('  POST /api/dewormings - Create deworming');
    console.log('  GET  /api/allergies - Get all allergies');
    console.log('  POST /api/allergies - Create allergy');
});

// Manejar todas las rutas del frontend (SPA)
app.get('*', (req, res) => {
    // Si es una ruta de API, no redirigir
    if (req.path.startsWith('/api/')) {
        return res.status(404).json({ error: 'API endpoint not found' });
    }
    
    // Para todas las demás rutas, servir el index.html del frontend
    res.sendFile(path.join(__dirname, '../../dist/index.html'));
});