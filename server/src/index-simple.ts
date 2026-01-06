import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Rutas básicas sin Prisma
app.get('/', (req, res) => {
    res.json({ message: 'Pet Health Hub API is running successfully!' });
});

app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Ruta de prueba para auth
app.post('/api/auth/login', (req, res) => {
    const { email, password } = req.body;
    
    // Simulación básica de login
    if (email && password) {
        // Generar un token simple para pruebas
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

// Ruta para registro
app.post('/api/auth/register', (req, res) => {
    const { email, password, name } = req.body;
    
    if (email && password && name) {
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxMjM0NTY3ODkwIiwibmFtZSI6IlRlc3QgVXNlciIsImVtYWlsIjoiJyArIGVtYWlsICsgJyIsImlhdCI6MTUxNjIzOTAyMn0.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
        
        res.json({ 
            success: true, 
            message: 'Registration successful',
            token: token,
            user: { 
                id: '1234567890',
                email: email, 
                name: name 
            }
        });
    } else {
        res.status(400).json({ 
            success: false, 
            message: 'Email, password and name required' 
        });
    }
});

// Base de datos en memoria para mascotas
let pets: any[] = [
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

// Obtener todas las mascotas
app.get('/api/pets', (req, res) => {
    res.json(pets);
});

// Obtener una mascota por ID
app.get('/api/pets/:id', (req, res) => {
    const pet = pets.find(p => p.id === req.params.id);
    if (!pet) {
        return res.status(404).json({ success: false, message: 'Mascota no encontrada' });
    }
    res.json(pet);
});

// Crear nueva mascota
app.post('/api/pets', (req, res) => {
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
    
    res.status(201).json({ 
        success: true, 
        message: 'Mascota creada exitosamente',
        pet: newPet
    });
});

// Actualizar mascota
app.put('/api/pets/:id', (req, res) => {
    const petIndex = pets.findIndex(p => p.id === req.params.id);
    if (petIndex === -1) {
        return res.status(404).json({ success: false, message: 'Mascota no encontrada' });
    }
    
    const { name, species, breed, birthDate, weight, microchipId } = req.body;
    
    pets[petIndex] = {
        ...pets[petIndex],
        name: name || pets[petIndex].name,
        species: species || pets[petIndex].species,
        breed: breed !== undefined ? breed : pets[petIndex].breed,
        birthDate: birthDate || pets[petIndex].birthDate,
        weight: weight !== undefined ? (weight ? parseFloat(weight) : null) : pets[petIndex].weight,
        microchipId: microchipId !== undefined ? microchipId : pets[petIndex].microchipId
    };
    
    res.json({ 
        success: true, 
        message: 'Mascota actualizada exitosamente',
        pet: pets[petIndex]
    });
});

// Eliminar mascota
app.delete('/api/pets/:id', (req, res) => {
    const petIndex = pets.findIndex(p => p.id === req.params.id);
    if (petIndex === -1) {
        return res.status(404).json({ success: false, message: 'Mascota no encontrada' });
    }
    
    pets.splice(petIndex, 1);
    res.json({ success: true, message: 'Mascota eliminada exitosamente' });
});

// Base de datos en memoria para citas
let appointments: any[] = [
    {
        id: '1',
        petId: '1',
        date: '2024-01-15',
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
        date: '2024-01-20',
        time: '14:30',
        type: 'Vacunación',
        veterinarian: 'Dra. Martínez',
        clinic: 'Clínica Veterinaria Central',
        notes: 'Vacuna anual',
        status: 'scheduled'
    }
];

// Obtener todas las citas
app.get('/api/appointments', (req, res) => {
    res.json(appointments);
});

// Obtener citas por mascota
app.get('/api/appointments/pet/:petId', (req, res) => {
    const petAppointments = appointments.filter(a => a.petId === req.params.petId);
    res.json(petAppointments);
});

// Crear nueva cita
app.post('/api/appointments', (req, res) => {
    const { petId, date, time, type, veterinarian, clinic, notes } = req.body;
    
    if (!petId || !date || !time || !type) {
        return res.status(400).json({ 
            success: false, 
            message: 'Mascota, fecha, hora y tipo de cita son requeridos' 
        });
    }
    
    const newAppointment = {
        id: Date.now().toString(),
        petId,
        date,
        time,
        type,
        veterinarian: veterinarian || '',
        clinic: clinic || '',
        notes: notes || '',
        status: 'scheduled'
    };
    
    appointments.push(newAppointment);
    
    res.status(201).json({ 
        success: true, 
        message: 'Cita creada exitosamente',
        appointment: newAppointment
    });
});

// Actualizar cita
app.put('/api/appointments/:id', (req, res) => {
    const appointmentIndex = appointments.findIndex(a => a.id === req.params.id);
    if (appointmentIndex === -1) {
        return res.status(404).json({ success: false, message: 'Cita no encontrada' });
    }
    
    const { date, time, type, veterinarian, clinic, notes, status } = req.body;
    
    appointments[appointmentIndex] = {
        ...appointments[appointmentIndex],
        date: date || appointments[appointmentIndex].date,
        time: time || appointments[appointmentIndex].time,
        type: type || appointments[appointmentIndex].type,
        veterinarian: veterinarian !== undefined ? veterinarian : appointments[appointmentIndex].veterinarian,
        clinic: clinic !== undefined ? clinic : appointments[appointmentIndex].clinic,
        notes: notes !== undefined ? notes : appointments[appointmentIndex].notes,
        status: status || appointments[appointmentIndex].status
    };
    
    res.json({ 
        success: true, 
        message: 'Cita actualizada exitosamente',
        appointment: appointments[appointmentIndex]
    });
});

// Eliminar cita
app.delete('/api/appointments/:id', (req, res) => {
    const appointmentIndex = appointments.findIndex(a => a.id === req.params.id);
    if (appointmentIndex === -1) {
        return res.status(404).json({ success: false, message: 'Cita no encontrada' });
    }
    
    appointments.splice(appointmentIndex, 1);
    res.json({ success: true, message: 'Cita eliminada exitosamente' });
});

// Base de datos en memoria para vacunas
let vaccines: any[] = [
    {
        id: '1',
        petId: '1',
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
        name: 'Parvovirus',
        date: '2023-07-10',
        nextDueDate: '2024-07-10',
        veterinarian: 'Dr. García',
        batchNumber: 'VAC789012',
        notes: 'Vacuna contra parvovirus'
    }
];

// Obtener todas las vacunas
app.get('/api/vaccines', (req, res) => {
    res.json(vaccines);
});

// Obtener vacunas por mascota
app.get('/api/vaccines/pet/:petId', (req, res) => {
    const petVaccines = vaccines.filter(v => v.petId === req.params.petId);
    res.json(petVaccines);
});

// Crear nueva vacuna
app.post('/api/vaccines', (req, res) => {
    const { petId, name, date, nextDueDate, veterinarian, batchNumber, notes } = req.body;
    
    if (!petId || !name || !date) {
        return res.status(400).json({ 
            success: false, 
            message: 'Mascota, nombre de vacuna y fecha son requeridos' 
        });
    }
    
    const newVaccine = {
        id: Date.now().toString(),
        petId,
        name,
        date,
        nextDueDate: nextDueDate || null,
        veterinarian: veterinarian || '',
        batchNumber: batchNumber || '',
        notes: notes || ''
    };
    
    vaccines.push(newVaccine);
    
    res.status(201).json({ 
        success: true, 
        message: 'Vacuna registrada exitosamente',
        vaccine: newVaccine
    });
});

// Actualizar vacuna
app.put('/api/vaccines/:id', (req, res) => {
    const vaccineIndex = vaccines.findIndex(v => v.id === req.params.id);
    if (vaccineIndex === -1) {
        return res.status(404).json({ success: false, message: 'Vacuna no encontrada' });
    }
    
    const { name, date, nextDueDate, veterinarian, batchNumber, notes } = req.body;
    
    vaccines[vaccineIndex] = {
        ...vaccines[vaccineIndex],
        name: name || vaccines[vaccineIndex].name,
        date: date || vaccines[vaccineIndex].date,
        nextDueDate: nextDueDate !== undefined ? nextDueDate : vaccines[vaccineIndex].nextDueDate,
        veterinarian: veterinarian !== undefined ? veterinarian : vaccines[vaccineIndex].veterinarian,
        batchNumber: batchNumber !== undefined ? batchNumber : vaccines[vaccineIndex].batchNumber,
        notes: notes !== undefined ? notes : vaccines[vaccineIndex].notes
    };
    
    res.json({ 
        success: true, 
        message: 'Vacuna actualizada exitosamente',
        vaccine: vaccines[vaccineIndex]
    });
});

// Eliminar vacuna
app.delete('/api/vaccines/:id', (req, res) => {
    const vaccineIndex = vaccines.findIndex(v => v.id === req.params.id);
    if (vaccineIndex === -1) {
        return res.status(404).json({ success: false, message: 'Vacuna no encontrada' });
    }
    
    vaccines.splice(vaccineIndex, 1);
    res.json({ success: true, message: 'Vacuna eliminada exitosamente' });
});

app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
    console.log(`📍 API available at: http://localhost:${PORT}`);
});