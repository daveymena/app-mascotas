import { Layout } from '@/components/layout/Layout';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import api from '@/lib/api';

interface Pet {
  id: string;
  name: string;
  species: string;
}

const AddDewormingPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    petId: '',
    productName: '',
    date: '',
    nextDueDate: '',
    veterinarian: '',
    dosage: '',
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
      const response = await api.post('/dewormings', formData);
      
      if (response.data.success) {
        toast.success('Desparasitación registrada exitosamente');
        navigate('/deworming');
      }
    } catch (error) {
      toast.error('Error al registrar la desparasitación');
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

  const commonProducts = [
    'Drontal Plus',
    'Milbemax',
    'Panacur',
    'Stronghold',
    'Revolution',
    'Advocate',
    'Bravecto',
    'NexGard'
  ];

  return (
    <Layout>
      <div className="mb-6">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/deworming')}
          className="mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Volver a Desparasitaciones
        </Button>
      </div>

      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            🐛 Registrar Desparasitación
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
              <Label htmlFor="productName">Producto *</Label>
              <select 
                id="productName"
                value={formData.productName} 
                onChange={(e) => handleInputChange('productName', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              >
                <option value="">Selecciona un producto</option>
                {commonProducts.map((product) => (
                  <option key={product} value={product}>
                    {product}
                  </option>
                ))}
                <option value="Otro">Otro (especificar en notas)</option>
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
                <Label htmlFor="dosage">Dosis</Label>
                <Input
                  id="dosage"
                  type="text"
                  placeholder="Ej: 1 tableta, 2ml"
                  value={formData.dosage}
                  onChange={(e) => handleInputChange('dosage', e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Notas adicionales</Label>
              <textarea
                id="notes"
                placeholder="Información adicional..."
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
                disabled={isLoading || !formData.petId || !formData.productName || !formData.date}
              >
                {isLoading ? 'Registrando...' : '🐛 Registrar Desparasitación'}
              </Button>
              
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => navigate('/deworming')}
                className="flex-1"
              >
                Cancelar
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </Layout>
  );
};

export default AddDewormingPage;