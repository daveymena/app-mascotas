export interface User {
  id: string;
  email: string;
  name?: string;
}

export interface Vaccine {
  id: string;
  petId: string;
  name: string;
  date: string; // ISO Date
  nextDueDate?: string;
  veterinarian?: string;
  batchNumber?: string;
  notes?: string;
}

export interface Appointment {
  id: string;
  petId: string;
  date: string;
  time: string;
  type: string;
  veterinarian?: string;
  clinic?: string;
  notes?: string;
  status: string;
}

export interface Allergy {
  id: string;
  petId: string;
  allergen: string;
  severity?: string;
  symptoms: string[];
  diagnosedDate?: string;
  notes?: string;
}

export interface Deworming {
  id: string;
  petId: string;
  productName: string;
  date: string;
  nextDueDate?: string;
  veterinarian?: string;
}

export interface Pet {
  id: string;
  name: string;
  species: string;
  breed?: string;
  birthDate: string;
  weight?: number;
  imageUrl?: string;
  microchipId?: string;
  ownerId: string;
  vaccines?: Vaccine[];
  appointments?: Appointment[];
  allergies?: Allergy[];
  dewormings?: Deworming[];
}
