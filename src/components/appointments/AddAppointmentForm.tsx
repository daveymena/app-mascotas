import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import api from '@/lib/api';

interface Pet {
  id: string;
  name: string;
  species: string;
}

interface AddAppointmentFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
  preselectedPetId?: string;
}

const AddAppointmentForm = ({ onSuccess, onCancel, preselectedPetId }: AddAppointmentFormProps) => {
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
    // Cargar lista de mascotas
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
      const response = await api.post('/appointments', formData);
      
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
          {/* Selección de mascota */}
          <div className="space-y-2">
            <Label htmlFor="petId">Mascota *</Label>
            <Select 
              value={formData.petId} 
              onValueChange={(value) => handleInputChange('petId', value)}
              disabled={!!preselectedPetId}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecciona una mascota" />
              </SelectTrigger>
              <SelectContent>
                {pets.map((pet) => (
                  <SelectItem key={pet.id} value={pet.id}>
                    {pet.name} ({pet.species})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Fecha y hora */}
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

          {/* Tipo de cita */}
          <div className="space-y-2">
            <Label htmlFor="type">Tipo de Cita *</Label>
            <Select 
              value={formData.type} 
              onValueChange={(value) => handleInputChange('type', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecciona el tipo de cita" />
              </SelectTrigger>
              <SelectContent>
                {appointmentTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Veterinario y clínica */}
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

          {/* Notas */}
          <div className="space-y-2">
            <Label htmlFor="notes">Notas adicionales</Label>
            <Textarea
              id="notes"
              placeholder="Información adicional sobre la cita..."
              value={formData.notes}
              onChange={(e) => handleInputChange('notes', e.target.value)}
              rows={3}
            />
          </div>

          {/* Botones */}
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

export default AddAppointmentForm;