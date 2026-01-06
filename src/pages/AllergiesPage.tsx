import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, Search, AlertTriangle, Calendar, User, Pill } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import api from '@/lib/api';

interface Allergy {
  id: string;
  petId: string;
  petName: string;
  allergen: string;
  severity: string;
  symptoms: string[];
  diagnosedDate: string;
  treatment: string;
  notes: string;
}

const AllergiesPage = () => {
  const navigate = useNavigate();
  const [allergies, setAllergies] = useState<Allergy[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchAllergies();
  }, []);

  const fetchAllergies = async () => {
    try {
      const response = await api.get('/allergies');
      setAllergies(response.data);
    } catch (error) {
      toast.error('Error al cargar las alergias');
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredAllergies = allergies.filter(allergy =>
    allergy.petName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    allergy.allergen.toLowerCase().includes(searchQuery.toLowerCase()) ||
    allergy.treatment.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'leve': return 'bg-green-100 text-green-800';
      case 'moderada': return 'bg-yellow-100 text-yellow-800';
      case 'severa': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Layout>
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">⚠️ Alergias</h1>
            <p className="text-muted-foreground">
              Registro de alergias y sensibilidades de tus mascotas
            </p>
          </div>
          <Button 
            variant="hero" 
            size="lg" 
            className="gap-2"
            onClick={() => navigate('/allergies/add')}
          >
            <Plus className="w-5 h-5" />
            Registrar Alergia
          </Button>
        </div>

        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="Buscar por mascota, alérgeno o tratamiento..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {isLoading ? (
        <div className="text-center py-8">Cargando alergias...</div>
      ) : filteredAllergies.length === 0 ? (
        <div className="text-center py-16">
          <AlertTriangle className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
          <p className="text-muted-foreground text-lg mb-4">
            {searchQuery ? 'No se encontraron alergias' : 'No hay alergias registradas'}
          </p>
          <Button onClick={() => navigate('/allergies/add')}>
            <Plus className="w-4 h-4 mr-2" />
            Registrar Primera Alergia
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAllergies.map((allergy) => (
            <Card key={allergy.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <CardTitle className="text-lg">{allergy.petName}</CardTitle>
                  <Badge className={getSeverityColor(allergy.severity)}>
                    {allergy.severity}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground font-medium">
                  {allergy.allergen}
                </p>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <span>Diagnosticada: {new Date(allergy.diagnosedDate).toLocaleDateString('es-ES')}</span>
                </div>
                
                {allergy.symptoms && allergy.symptoms.length > 0 && (
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Síntomas:</p>
                    <div className="flex flex-wrap gap-1">
                      {allergy.symptoms.map((symptom, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {symptom}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
                
                {allergy.treatment && (
                  <div className="flex items-center gap-2 text-sm">
                    <Pill className="w-4 h-4 text-muted-foreground" />
                    <span>Tratamiento: {allergy.treatment}</span>
                  </div>
                )}
                
                {allergy.notes && (
                  <div className="text-sm text-muted-foreground bg-muted p-2 rounded">
                    {allergy.notes}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </Layout>
  );
};

export default AllergiesPage;