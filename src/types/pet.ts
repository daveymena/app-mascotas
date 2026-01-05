export interface Pet {
  id: string;
  name: string;
  species: 'dog' | 'cat' | 'bird' | 'rabbit' | 'other';
  breed: string;
  birthDate: string;
  weight: number;
  imageUrl: string;
  microchipId?: string;
  ownerId: string;
}

export interface Vaccine {
  id: string;
  petId: string;
  name: string;
  date: string;
  nextDueDate?: string;
  veterinarian: string;
  batchNumber?: string;
  notes?: string;
}

export interface Appointment {
  id: string;
  petId: string;
  date: string;
  time: string;
  type: 'checkup' | 'vaccine' | 'surgery' | 'emergency' | 'grooming' | 'other';
  veterinarian: string;
  clinic: string;
  notes?: string;
  status: 'scheduled' | 'completed' | 'cancelled';
}

export interface Allergy {
  id: string;
  petId: string;
  allergen: string;
  severity: 'mild' | 'moderate' | 'severe';
  symptoms: string[];
  diagnosedDate: string;
  notes?: string;
}

export interface Deworming {
  id: string;
  petId: string;
  productName: string;
  date: string;
  nextDueDate: string;
  veterinarian?: string;
  notes?: string;
}

export interface MedicalRecord {
  id: string;
  petId: string;
  type: 'diagnosis' | 'treatment' | 'surgery' | 'test';
  title: string;
  description: string;
  date: string;
  veterinarian: string;
  attachments?: string[];
}
