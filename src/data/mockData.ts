import { Pet, Vaccine, Appointment, Allergy, Deworming } from '@/types/pet';

export const mockPets: Pet[] = [
  {
    id: '1',
    name: 'Luna',
    species: 'dog',
    breed: 'Golden Retriever',
    birthDate: '2021-03-15',
    weight: 28.5,
    imageUrl: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=400&h=400&fit=crop',
    microchipId: '985112345678901',
    ownerId: 'user1',
  },
  {
    id: '2',
    name: 'Michi',
    species: 'cat',
    breed: 'Siamés',
    birthDate: '2020-07-22',
    weight: 4.2,
    imageUrl: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&h=400&fit=crop',
    microchipId: '985112345678902',
    ownerId: 'user1',
  },
  {
    id: '3',
    name: 'Rocky',
    species: 'dog',
    breed: 'Bulldog Francés',
    birthDate: '2022-11-08',
    weight: 12.3,
    imageUrl: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=400&h=400&fit=crop',
    ownerId: 'user1',
  },
];

export const mockVaccines: Vaccine[] = [
  {
    id: 'v1',
    petId: '1',
    name: 'Rabia',
    date: '2024-01-15',
    nextDueDate: '2025-01-15',
    veterinarian: 'Dr. María García',
    batchNumber: 'RAB-2024-001',
    notes: 'Sin reacciones adversas',
  },
  {
    id: 'v2',
    petId: '1',
    name: 'Parvovirus',
    date: '2024-02-20',
    nextDueDate: '2025-02-20',
    veterinarian: 'Dr. María García',
    batchNumber: 'PARVO-2024-045',
  },
  {
    id: 'v3',
    petId: '2',
    name: 'Triple Felina',
    date: '2024-03-10',
    nextDueDate: '2025-03-10',
    veterinarian: 'Dr. Carlos López',
    batchNumber: 'TF-2024-112',
  },
  {
    id: 'v4',
    petId: '3',
    name: 'Polivalente',
    date: '2024-04-05',
    nextDueDate: '2025-04-05',
    veterinarian: 'Dr. María García',
  },
];

export const mockAppointments: Appointment[] = [
  {
    id: 'a1',
    petId: '1',
    date: '2025-01-20',
    time: '10:00',
    type: 'checkup',
    veterinarian: 'Dr. María García',
    clinic: 'Clínica Veterinaria San Francisco',
    notes: 'Revisión anual',
    status: 'scheduled',
  },
  {
    id: 'a2',
    petId: '2',
    date: '2025-01-25',
    time: '16:30',
    type: 'vaccine',
    veterinarian: 'Dr. Carlos López',
    clinic: 'Hospital Veterinario Central',
    notes: 'Vacuna de refuerzo',
    status: 'scheduled',
  },
  {
    id: 'a3',
    petId: '3',
    date: '2025-02-01',
    time: '09:00',
    type: 'grooming',
    veterinarian: 'Ana Martínez',
    clinic: 'Pet Spa & Care',
    status: 'scheduled',
  },
];

export const mockAllergies: Allergy[] = [
  {
    id: 'al1',
    petId: '1',
    allergen: 'Pollo',
    severity: 'moderate',
    symptoms: ['Picazón', 'Vómitos', 'Diarrea'],
    diagnosedDate: '2023-06-15',
    notes: 'Evitar alimentos con proteína de pollo',
  },
  {
    id: 'al2',
    petId: '2',
    allergen: 'Polen',
    severity: 'mild',
    symptoms: ['Estornudos', 'Ojos llorosos'],
    diagnosedDate: '2023-09-20',
  },
];

export const mockDewormings: Deworming[] = [
  {
    id: 'd1',
    petId: '1',
    productName: 'Milbemax',
    date: '2024-11-15',
    nextDueDate: '2025-02-15',
    veterinarian: 'Dr. María García',
  },
  {
    id: 'd2',
    petId: '2',
    productName: 'Broadline',
    date: '2024-12-01',
    nextDueDate: '2025-03-01',
    veterinarian: 'Dr. Carlos López',
  },
  {
    id: 'd3',
    petId: '3',
    productName: 'Nexgard Spectra',
    date: '2024-12-20',
    nextDueDate: '2025-03-20',
    veterinarian: 'Dr. María García',
  },
];
