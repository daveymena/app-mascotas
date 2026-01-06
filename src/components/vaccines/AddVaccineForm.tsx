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

interface AddVaccineFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
  preselectedPetId?: string;
}

const AddVaccineForm = ({ onSuccess, onCancel, preselectedPetId }: AddVaccineFormProps) => {
  const [formData, setFormData] = useState({
    petId: preselectedPetId || '',
    name: '',
    date: '',
    nextDueDate: '',
    veterinarian: '',
    batchNumber: '',
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
      const response = await api.post('/vaccines', formData);
      
      if (response.data.success) {
        toast.success('Vacuna registrada exitosamente');
        setFormData({
          petId: preselectedPetId || '',
          name: '',
          date: '',
          nextDueDate: '',
          veterinarian: '',
          batchNumber: '',
          notes: ''
        });
        onSuccess?.();
      }
    } catch (error) {
      toast.error('Error al registrar la vacuna');
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

  const commonVaccines = [
    'Rabia',
    'Parvovirus',
    'Moquillo',
    'Hepatitis',
    'Parainfluenza',
    'Bordetella',
    'Leptospirosis',
    'Triple Felina',
    'Leucemia Felina',
    'Calicivirus'
  ];

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          💉 Registrar Vacuna
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

          <div className="space-y-2">
            <Label htmlFor="name">Vacuna *</Label>
            <select 
              id="name"
              value={formData.name} 
              onChange={(e) => handleInputChange('name', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            >
              <option value="">Selecciona una vacuna</option>
              {commonVaccines.map((vaccine) => (
                <option key={vaccine} value={vaccine}>
                  {vaccine}
                </option>
              ))}
              <option value="Otra">Otra (especificar en notas)</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date">Fecha de Aplicación *</Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => handleInputChange('date', e.target.value)}
                max={new Date().toISOString().split('T')[0]}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="nextDueDate">Próxima Dosis</Label>
              <Input
                id="nextDueDate"
                type="date"
                value={formData.nextDueDate}
                onChange={(e) => handleInputChange('nextDueDate', e.target.value)}
                min={new Date().toISOString().split('T')[0]}
              />
            </div>
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
              <Label htmlFor="batchNumber">Número de Lote</Label>
              <Input
                id="batchNumber"
                type="text"
                placeholder="Ej: VAC123456"
                value={formData.batchNumber}
                onChange={(e) => handleInputChange('batchNumber', e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notas adicionales</Label>
            <textarea
              id="notes"
              placeholder="Información adicional sobre la vacuna..."
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
              disabled={isLoading || !formData.petId || !formData.name || !formData.date}
            >
              {isLoading ? 'Registrando...' : '💉 Registrar Vacuna'}
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

export default AddVaccineForm;