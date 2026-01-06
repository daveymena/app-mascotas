import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, Search, Calendar, Clock, User, MapPin } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import api from '@/lib/api';
import AdBanner from '@/components/ads/AdBanner';

interface Appointment {
  id: string;
  petId: string;
  petName: string;
  date: string;
  time: string;
  type: string;
  veterinarian: string;
  clinic: string;
  notes: string;
  status: string;
}

const AppointmentsPage = () => {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await api.get('/appointments');
      setAppointments(response.data);
    } catch (error) {
      toast.error('Error al cargar las citas');
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredAppointments = appointments.filter(appointment =>
    appointment.petName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    appointment.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
    appointment.veterinarian.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'scheduled': return 'Programada';
      case 'completed': return 'Completada';
      case 'cancelled': return 'Cancelada';
      default: return status;
    }
  };

  return (
    <Layout>
      {/* Anuncio sutil en el header */}
      <AdBanner position="top" userPlan="FREE" />
      
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">📅 Citas Médicas</h1>
            <p className="text-muted-foreground">
              Gestiona las citas veterinarias de tus mascotas
            </p>
          </div>
          <Button 
            variant="hero" 
            size="lg" 
            className="gap-2"
            onClick={() => navigate('/appointments/add')}
          >
            <Plus className="w-5 h-5" />
            Agendar Cita
          </Button>
        </div>

        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="Buscar por mascota, tipo o veterinario..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Contenido principal */}
        <div className="lg:col-span-3">
          {isLoading ? (
            <div className="text-center py-8">Cargando citas...</div>
          ) : filteredAppointments.length === 0 ? (
            <div className="text-center py-16">
              <Calendar className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground text-lg mb-4">
                {searchQuery ? 'No se encontraron citas' : 'No tienes citas programadas'}
              </p>
              <Button onClick={() => navigate('/appointments/add')}>
                <Plus className="w-4 h-4 mr-2" />
                Agendar Primera Cita
              </Button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredAppointments.slice(0, 4).map((appointment) => (
                  <Card key={appointment.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <CardTitle className="text-lg">{appointment.petName}</CardTitle>
                        <Badge className={getStatusColor(appointment.status)}>
                          {getStatusText(appointment.status)}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground font-medium">
                        {appointment.type}
                      </p>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        <span>{new Date(appointment.date).toLocaleDateString('es-ES')}</span>
                      </div>
                      
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        <span>{appointment.time}</span>
                      </div>
                      
                      {appointment.veterinarian && (
                        <div className="flex items-center gap-2 text-sm">
                          <User className="w-4 h-4 text-muted-foreground" />
                          <span>{appointment.veterinarian}</span>
                        </div>
                      )}
                      
                      {appointment.clinic && (
                        <div className="flex items-center gap-2 text-sm">
                          <MapPin className="w-4 h-4 text-muted-foreground" />
                          <span>{appointment.clinic}</span>
                        </div>
                      )}
                      
                      {appointment.notes && (
                        <div className="text-sm text-muted-foreground bg-muted p-2 rounded">
                          {appointment.notes}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              {/* Anuncio inline después de las primeras citas */}
              {filteredAppointments.length > 4 && (
                <AdBanner position="inline" userPlan="FREE" />
              )}
              
              {/* Resto de las citas */}
              {filteredAppointments.length > 4 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  {filteredAppointments.slice(4).map((appointment) => (
                    <Card key={appointment.id} className="hover:shadow-lg transition-shadow">
                      {/* Mismo contenido que arriba */}
                    </Card>
                  ))}
                </div>
              )}
            </>
          )}
        </div>

        {/* Sidebar con anuncio sutil */}
        <div className="lg:col-span-1">
          <AdBanner position="sidebar" userPlan="FREE" />
          
          {/* Contenido adicional del sidebar */}
          <Card className="p-4">
            <h3 className="font-semibold mb-3">Próximas citas</h3>
            <div className="space-y-2">
              {filteredAppointments.slice(0, 3).map((appointment) => (
                <div key={appointment.id} className="text-sm p-2 bg-gray-50 rounded">
                  <p className="font-medium">{appointment.petName}</p>
                  <p className="text-gray-600">{appointment.type}</p>
                  <p className="text-xs text-gray-500">
                    {new Date(appointment.date).toLocaleDateString('es-ES')} - {appointment.time}
                  </p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {/* Anuncio sutil en el footer */}
      <div className="mt-8">
        <AdBanner position="bottom" userPlan="FREE" />
      </div>
    </Layout>
  );
};

export default AppointmentsPage;