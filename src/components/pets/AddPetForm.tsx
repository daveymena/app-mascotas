import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import api from '@/lib/api';

interface AddPetFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
}

const AddPetForm = ({ onSuccess, onCancel }: AddPetFormProps) => {
  const [formData, setFormData] = useState({
    name: '',
    species: '',
    breed: '',
    birthDate: '',
    weight: '',
    microchipId: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await api.post('/pets', formData);
      
      if (response.data.success) {
        toast.success('Mascota agregada exitosamente');
        setFormData({
          name: '',
          species: '',
          breed: '',
          birthDate: '',
          weight: '',
          microchipId: ''
        });
        onSuccess?.();
      }
    } catch (error) {
      toast.error('Error al agregar la mascota');
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

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          🐾 Agregar Nueva Mascota
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Información básica */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nombre *</Label>
              <Input
                id="name"
                type="text"
                placeholder="Ej: Max, Luna, Buddy"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="species">Especie *</Label>
              <Select 
                value={formData.species} 
                onValueChange={(value) => handleInputChange('species', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona la especie" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Perro">🐕 Perro</SelectItem>
                  <SelectItem value="Gato">🐱 Gato</SelectItem>
                  <SelectItem value="Conejo">🐰 Conejo</SelectItem>
                  <SelectItem value="Hamster">🐹 Hamster</SelectItem>
                  <SelectItem value="Ave">🐦 Ave</SelectItem>
                  <SelectItem value="Reptil">🦎 Reptil</SelectItem>
                  <SelectItem value="Otro">🐾 Otro</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="breed">Raza</Label>
              <Input
                id="breed"
                type="text"
                placeholder="Ej: Golden Retriever, Siamés"
                value={formData.breed}
                onChange={(e) => handleInputChange('breed', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="birthDate">Fecha de Nacimiento *</Label>
              <Input
                id="birthDate"
                type="date"
                value={formData.birthDate}
                onChange={(e) => handleInputChange('birthDate', e.target.value)}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="weight">Peso (kg)</Label>
              <Input
                id="weight"
                type="number"
                step="0.1"
                placeholder="Ej: 5.5"
                value={formData.weight}
                onChange={(e) => handleInputChange('weight', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="microchipId">ID del Microchip</Label>
              <Input
                id="microchipId"
                type="text"
                placeholder="Ej: MC001234567"
                value={formData.microchipId}
                onChange={(e) => handleInputChange('microchipId', e.target.value)}
              />
            </div>
          </div>

          {/* Botones */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button 
              type="submit" 
              className="flex-1"
              disabled={isLoading || !formData.name || !formData.species || !formData.birthDate}
            >
              {isLoading ? 'Guardando...' : '✅ Agregar Mascota'}
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

export default AddPetForm;