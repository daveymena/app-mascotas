import { Layout } from '@/components/layout/Layout';
import { AppointmentCard } from '@/components/appointments/AppointmentCard';
import { mockAppointments, mockPets } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Calendar } from 'lucide-react';

const AppointmentsPage = () => {
  const upcomingAppointments = mockAppointments.filter(
    apt => new Date(apt.date) >= new Date() && apt.status === 'scheduled'
  );
  const pastAppointments = mockAppointments.filter(
    apt => new Date(apt.date) < new Date() || apt.status === 'completed'
  );

  return (
    <Layout>
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">Citas Veterinarias</h1>
            <p className="text-muted-foreground">
              Gestiona las citas médicas de tus mascotas
            </p>
          </div>
          <Button variant="hero" size="lg" className="gap-2">
            <Plus className="w-5 h-5" />
            Agendar cita
          </Button>
        </div>
      </div>

      <Tabs defaultValue="upcoming" className="space-y-6">
        <TabsList>
          <TabsTrigger value="upcoming">Próximas ({upcomingAppointments.length})</TabsTrigger>
          <TabsTrigger value="past">Historial ({pastAppointments.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="space-y-4">
          {upcomingAppointments.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2">
              {upcomingAppointments.map(apt => {
                const pet = mockPets.find(p => p.id === apt.petId)!;
                return <AppointmentCard key={apt.id} appointment={apt} pet={pet} />;
              })}
            </div>
          ) : (
            <div className="text-center py-16">
              <Calendar className="w-16 h-16 mx-auto mb-4 text-muted-foreground/50" />
              <p className="text-lg text-muted-foreground mb-4">No hay citas próximas</p>
              <Button variant="outline">Agendar una cita</Button>
            </div>
          )}
        </TabsContent>

        <TabsContent value="past" className="space-y-4">
          {pastAppointments.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2">
              {pastAppointments.map(apt => {
                const pet = mockPets.find(p => p.id === apt.petId)!;
                return <AppointmentCard key={apt.id} appointment={apt} pet={pet} />;
              })}
            </div>
          ) : (
            <div className="text-center py-16">
              <Calendar className="w-16 h-16 mx-auto mb-4 text-muted-foreground/50" />
              <p className="text-lg text-muted-foreground">No hay citas en el historial</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </Layout>
  );
};

export default AppointmentsPage;
