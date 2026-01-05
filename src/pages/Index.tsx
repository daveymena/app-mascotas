import { Layout } from '@/components/layout/Layout';
import { StatCard } from '@/components/dashboard/StatCard';
import { PetCard } from '@/components/pets/PetCard';
import { AppointmentCard } from '@/components/appointments/AppointmentCard';
import { VaccineCard } from '@/components/health/VaccineCard';
import { DewormingCard } from '@/components/health/DewormingCard';
import { mockPets, mockAppointments, mockVaccines, mockDewormings, mockAllergies } from '@/data/mockData';
import { PawPrint, Calendar, Syringe, AlertTriangle, ArrowRight, Bug } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();
  
  // Get upcoming appointments
  const upcomingAppointments = mockAppointments
    .filter(apt => new Date(apt.date) >= new Date())
    .slice(0, 2);

  // Get vaccines that are due soon
  const vaccinesDueSoon = mockVaccines
    .filter(v => v.nextDueDate && new Date(v.nextDueDate) <= new Date(Date.now() + 60 * 24 * 60 * 60 * 1000))
    .slice(0, 2);

  // Get dewormings that are due soon
  const dewormingsDueSoon = mockDewormings
    .filter(d => new Date(d.nextDueDate) <= new Date(Date.now() + 30 * 24 * 60 * 60 * 1000))
    .slice(0, 2);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="mb-10">
        <div className="relative overflow-hidden rounded-3xl gradient-hero p-8 md:p-12">
          <div className="relative z-10">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-primary-foreground mb-4">
              Bienvenido a PetHealth 🐾
            </h1>
            <p className="text-primary-foreground/90 text-lg md:text-xl max-w-2xl mb-6">
              El carnet de salud digital para tus mascotas. Mantén al día sus vacunas, citas y tratamientos en un solo lugar.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button variant="hero" size="lg" className="bg-card text-foreground hover:bg-card/90" onClick={() => navigate('/pets')}>
                Ver mis mascotas
                <ArrowRight className="w-5 h-5" />
              </Button>
              <Button variant="outline" size="lg" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground">
                Agregar mascota
              </Button>
            </div>
          </div>
          {/* Decorative circles */}
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-primary-foreground/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-accent/20 rounded-full blur-2xl" />
        </div>
      </section>

      {/* Stats Section */}
      <section className="mb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Mascotas"
            value={mockPets.length}
            icon={<PawPrint className="w-6 h-6" />}
            description="Registradas"
          />
          <StatCard
            title="Citas Próximas"
            value={upcomingAppointments.length}
            icon={<Calendar className="w-6 h-6" />}
            description="Este mes"
          />
          <StatCard
            title="Vacunas"
            value={mockVaccines.length}
            icon={<Syringe className="w-6 h-6" />}
            description="Registradas"
          />
          <StatCard
            title="Alergias"
            value={mockAllergies.length}
            icon={<AlertTriangle className="w-6 h-6" />}
            description="Identificadas"
          />
        </div>
      </section>

      {/* Pets Section */}
      <section className="mb-10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Mis Mascotas</h2>
          <Link to="/pets">
            <Button variant="ghost" className="gap-2">
              Ver todas <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockPets.slice(0, 3).map((pet) => (
            <PetCard key={pet.id} pet={pet} onClick={() => navigate(`/pets/${pet.id}`)} />
          ))}
        </div>
      </section>

      {/* Appointments & Reminders */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
        {/* Upcoming Appointments */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Próximas Citas</h2>
            <Link to="/appointments">
              <Button variant="ghost" className="gap-2">
                Ver todas <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
          <div className="space-y-4">
            {upcomingAppointments.length > 0 ? (
              upcomingAppointments.map((apt) => {
                const pet = mockPets.find(p => p.id === apt.petId)!;
                return <AppointmentCard key={apt.id} appointment={apt} pet={pet} />;
              })
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <Calendar className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>No hay citas próximas</p>
              </div>
            )}
          </div>
        </section>

        {/* Vaccine Reminders */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Recordatorios</h2>
            <Link to="/vaccines">
              <Button variant="ghost" className="gap-2">
                Ver todos <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
          <div className="space-y-4">
            {vaccinesDueSoon.map((vaccine) => (
              <VaccineCard key={vaccine.id} vaccine={vaccine} />
            ))}
            {dewormingsDueSoon.map((deworming) => (
              <DewormingCard key={deworming.id} deworming={deworming} />
            ))}
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Index;
