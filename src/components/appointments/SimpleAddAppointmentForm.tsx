import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import api from '@/lib/api';

interface Pet {
  id: string;
  name: string;
  species: string;
}

interface SimpleAddAppointmentFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
  preselectedPetId?: string;
}

const SimpleAddAppointmentForm = ({ onSuccess, onCancel, preselectedPetId }: SimpleAddAppointmentFormProps) => {
  const [formData, setFormData] = useState({
    petId: preselectedPetId || '',
    date: '',
    time: '',
    type: '',
    veterinarian: '',
    clinic: '',
    notes: ''
  });
  const [pets, setPets] = useState<Pet[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const response = await api.get('/pets');
        setPets(response.data);
      } catch (error) {
        console.error('Error loading pets:', error);
      }
    };
    fetchPets();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const pet = pets.find(p => p.id === formData.petId);
      const appointmentData = {
        ...formData,
        petName: pet ? pet.name : 'Mascota desconocida'
      };
      
      const response = await api.post('/appointments', appointmentData);
      
      if (response.data.success) {
        toast.success('Cita agendada exitosamente');
        setFormData({
          petId: preselectedPetId || '',
          date: '',
          time: '',
          type: '',
          veterinarian: '',
          clinic: '',
          notes: ''
        });
        onSuccess?.();
      }
    } catch (error) {
      toast.error('Error al agendar la cita');
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const appointmentTypes = [
    'Consulta general',
    'Vacunación',
    'Desparasitación',
    'Cirugía',
    'Emergencia',
    'Control post-operatorio',
    'Limpieza dental',
    'Examen de rutina',
    'Tratamiento especializado'
  ];

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          📅 Agendar Nueva Cita
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="petId">Mascota *</Label>
            <select 
              id="petId"
              value={formData.petId} 
              onChange={(e) => handleInputChange('petId', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              disabled={!!preselectedPetId}
              required
            >
              <option value="">Selecciona una mascota</option>
              {pets.map((pet) => (
                <option key={pet.id} value={pet.id}>
                  {pet.name} ({pet.species})
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date">Fecha *</Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => handleInputChange('date', e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="time">Hora *</Label>
              <Input
                id="time"
                type="time"
                value={formData.time}
                onChange={(e) => handleInputChange('time', e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="type">Tipo de Cita *</Label>
            <select 
              id="type"
              value={formData.type} 
              onChange={(e) => handleInputChange('type', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            >
              <option value="">Selecciona el tipo de cita</option>
              {appointmentTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="veterinarian">Veterinario</Label>
              <Input
                id="veterinarian"
                type="text"
                placeholder="Ej: Dr. García"
                value={formData.veterinarian}
                onChange={(e) => handleInputChange('veterinarian', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="clinic">Clínica</Label>
              <Input
                id="clinic"
                type="text"
                placeholder="Ej: Clínica Veterinaria Central"
                value={formData.clinic}
                onChange={(e) => handleInputChange('clinic', e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notas adicionales</Label>
            <textarea
              id="notes"
              placeholder="Información adicional sobre la cita..."
              value={formData.notes}
              onChange={(e) => handleInputChange('notes', e.target.value)}
              rows={3}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button 
              type="submit" 
              className="flex-1"
              disabled={isLoading || !formData.petId || !formData.date || !formData.time || !formData.type}
            >
              {isLoading ? 'Agendando...' : '📅 Agendar Cita'}
            </Button>
            
            {onCancel && (
              <Button 
                type="button" 
                variant="outline" 
                onClick={onCancel}
                className="flex-1"
              >
                Cancelar
              </Button>
            )}
          </div>

          <p className="text-sm text-muted-foreground text-center">
            * Campos obligatorios
          </p>
        </form>
      </CardContent>
    </Card>
  );
};

export default SimpleAddAppointmentForm;