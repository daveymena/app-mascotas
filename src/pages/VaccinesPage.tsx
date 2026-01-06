import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, Search, Syringe, Calendar, User, FileText } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import api from '@/lib/api';

interface Vaccine {
  id: string;
  petId: string;
  petName: string;
  name: string;
  date: string;
  nextDueDate: string | null;
  veterinarian: string;
  batchNumber: string;
  notes: string;
}

const VaccinesPage = () => {
  const navigate = useNavigate();
  const [vaccines, setVaccines] = useState<Vaccine[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchVaccines();
  }, []);

  const fetchVaccines = async () => {
    try {
      const response = await api.get('/vaccines');
      setVaccines(response.data);
    } catch (error) {
      toast.error('Error al cargar las vacunas');
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredVaccines = vaccines.filter(vaccine =>
    vaccine.petName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    vaccine.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    vaccine.veterinarian.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const isVaccineDue = (nextDueDate: string | null) => {
    if (!nextDueDate) return false;
    const dueDate = new Date(nextDueDate);
    const today = new Date();
    const diffTime = dueDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 30; // Próxima en 30 días o menos
  };

  const getDueBadge = (nextDueDate: string | null) => {
    if (!nextDueDate) return null;
    
    const dueDate = new Date(nextDueDate);
    const today = new Date();
    const diffTime = dueDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) {
      return <Badge className="bg-red-100 text-red-800">Vencida</Badge>;
    } else if (diffDays <= 7) {
      return <Badge className="bg-orange-100 text-orange-800">Próxima</Badge>;
    } else if (diffDays <= 30) {
      return <Badge className="bg-yellow-100 text-yellow-800">Programada</Badge>;
    }
    return <Badge className="bg-green-100 text-green-800">Al día</Badge>;
  };

  return (
    <Layout>
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">💉 Vacunas</h1>
            <p className="text-muted-foreground">
              Control de vacunación de tus mascotas
            </p>
          </div>
          <Button 
            variant="hero" 
            size="lg" 
            className="gap-2"
            onClick={() => navigate('/vaccines/add')}
          >
            <Plus className="w-5 h-5" />
            Registrar Vacuna
          </Button>
        </div>

        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="Buscar por mascota, vacuna o veterinario..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {isLoading ? (
        <div className="text-center py-8">Cargando vacunas...</div>
      ) : filteredVaccines.length === 0 ? (
        <div className="text-center py-16">
          <Syringe className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
          <p className="text-muted-foreground text-lg mb-4">
            {searchQuery ? 'No se encontraron vacunas' : 'No hay vacunas registradas'}
          </p>
          <Button onClick={() => navigate('/vaccines/add')}>
            <Plus className="w-4 h-4 mr-2" />
            Registrar Primera Vacuna
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVaccines.map((vaccine) => (
            <Card key={vaccine.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <CardTitle className="text-lg">{vaccine.petName}</CardTitle>
                  {getDueBadge(vaccine.nextDueDate)}
                </div>
                <p className="text-sm text-muted-foreground font-medium">
                  {vaccine.name}
                </p>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <span>Aplicada: {new Date(vaccine.date).toLocaleDateString('es-ES')}</span>
                </div>
                
                {vaccine.nextDueDate && (
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span>Próxima: {new Date(vaccine.nextDueDate).toLocaleDateString('es-ES')}</span>
                  </div>
                )}
                
                {vaccine.veterinarian && (
                  <div className="flex items-center gap-2 text-sm">
                    <User className="w-4 h-4 text-muted-foreground" />
                    <span>{vaccine.veterinarian}</span>
                  </div>
                )}
                
                {vaccine.batchNumber && (
                  <div className="flex items-center gap-2 text-sm">
                    <FileText className="w-4 h-4 text-muted-foreground" />
                    <span>Lote: {vaccine.batchNumber}</span>
                  </div>
                )}
                
                {vaccine.notes && (
                  <div className="text-sm text-muted-foreground bg-muted p-2 rounded">
                    {vaccine.notes}
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

export default VaccinesPage;