import { Layout } from '@/components/layout/Layout';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';
import { toast } from 'sonner';
import api from '@/lib/api';

interface Pet {
  id: string;
  name: string;
  species: string;
}

const AddAllergyPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    petId: '',
    allergen: '',
    severity: '',
    diagnosedDate: '',
    treatment: '',
    notes: ''
  });
  const [symptoms, setSymptoms] = useState<string[]>([]);
  const [newSymptom, setNewSymptom] = useState('');
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
      const response = await api.post('/allergies', {
        ...formData,
        symptoms
      });
      
      if (response.data.success) {
        toast.success('Alergia registrada exitosamente');
        navigate('/allergies');
      }
    } catch (error) {
      toast.error('Error al registrar la alergia');
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

  const addSymptom = () => {
    if (newSymptom.trim() && !symptoms.includes(newSymptom.trim())) {
      setSymptoms([...symptoms, newSymptom.trim()]);
      setNewSymptom('');
    }
  };

  const removeSymptom = (symptomToRemove: string) => {
    setSymptoms(symptoms.filter(symptom => symptom !== symptomToRemove));
  };

  const commonAllergens = [
    'Polen de gramíneas',
    'Ácaros del polvo',
    'Pollo',
    'Res',
    'Pescado',
    'Huevos',
    'Soja',
    'Trigo',
    'Maíz',
    'Lácteos',
    'Pulgas',
    'Productos químicos de limpieza',
    'Perfumes',
    'Medicamentos'
  ];

  const commonSymptoms = [
    'Picazón',
    'Estornudos',
    'Ojos llorosos',
    'Vómitos',
    'Diarrea',
    'Erupciones cutáneas',
    'Pérdida de pelo',
    'Dificultad respiratoria',
    'Hinchazón',
    'Letargo'
  ];

  return (
    <Layout>
      <div className="mb-6">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/allergies')}
          className="mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Volver a Alergias
        </Button>
      </div>

      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            ⚠️ Registrar Alergia
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
              <Label htmlFor="allergen">Alérgeno *</Label>
              <select 
                id="allergen"
                value={formData.allergen} 
                onChange={(e) => handleInputChange('allergen', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              >
                <option value="">Selecciona un alérgeno</option>
                {commonAllergens.map((allergen) => (
                  <option key={allergen} value={allergen}>
                    {allergen}
                  </option>
                ))}
                <option value="Otro">Otro (especificar en notas)</option>
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="severity">Severidad *</Label>
                <select 
                  id="severity"
                  value={formData.severity} 
                  onChange={(e) => handleInputChange('severity', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                >
                  <option value="">Selecciona la severidad</option>
                  <option value="Leve">Leve</option>
                  <option value="Moderada">Moderada</option>
                  <option value="Severa">Severa</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="diagnosedDate">Fecha de Diagnóstico</Label>
                <Input
                  id="diagnosedDate"
                  type="date"
                  value={formData.diagnosedDate}
                  onChange={(e) => handleInputChange('diagnosedDate', e.target.value)}
                  max={new Date().toISOString().split('T')[0]}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Síntomas</Label>
              <div className="flex gap-2">
                <select 
                  value={newSymptom}
                  onChange={(e) => setNewSymptom(e.target.value)}
                  className="flex-1 p-2 border border-gray-300 rounded-md"
                >
                  <option value="">Selecciona un síntoma</option>
                  {commonSymptoms.map((symptom) => (
                    <option key={symptom} value={symptom}>
                      {symptom}
                    </option>
                  ))}
                </select>
                <Button type="button" onClick={addSymptom} disabled={!newSymptom}>
                  Agregar
                </Button>
              </div>
              
              {symptoms.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {symptoms.map((symptom, index) => (
                    <Badge key={index} variant="outline" className="flex items-center gap-1">
                      {symptom}
                      <X 
                        className="w-3 h-3 cursor-pointer" 
                        onClick={() => removeSymptom(symptom)}
                      />
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="treatment">Tratamiento</Label>
              <Input
                id="treatment"
                type="text"
                placeholder="Ej: Antihistamínicos, dieta hipoalergénica"
                value={formData.treatment}
                onChange={(e) => handleInputChange('treatment', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Notas adicionales</Label>
              <textarea
                id="notes"
                placeholder="Información adicional sobre la alergia..."
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
                disabled={isLoading || !formData.petId || !formData.allergen || !formData.severity}
              >
                {isLoading ? 'Registrando...' : '⚠️ Registrar Alergia'}
              </Button>
              
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => navigate('/allergies')}
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

export default AddAllergyPage;