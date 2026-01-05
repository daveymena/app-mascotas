import { useParams, Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { mockPets, mockVaccines, mockAppointments, mockAllergies, mockDewormings } from '@/data/mockData';
import { VaccineCard } from '@/components/health/VaccineCard';
import { AllergyCard } from '@/components/health/AllergyCard';
import { DewormingCard } from '@/components/health/DewormingCard';
import { AppointmentCard } from '@/components/appointments/AppointmentCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ArrowLeft, 
  Calendar, 
  Weight, 
  Microchip, 
  Syringe, 
  Bug, 
  AlertTriangle,
  Edit,
  Cake
} from 'lucide-react';
import { format, differenceInYears, differenceInMonths } from 'date-fns';
import { es } from 'date-fns/locale';

const speciesEmoji: Record<string, string> = {
  dog: '🐕',
  cat: '🐱',
  bird: '🦜',
  rabbit: '🐰',
  other: '🐾',
};

const speciesLabel: Record<string, string> = {
  dog: 'Perro',
  cat: 'Gato',
  bird: 'Ave',
  rabbit: 'Conejo',
  other: 'Otro',
};

function calculateAge(birthDate: string): string {
  const birth = new Date(birthDate);
  const now = new Date();
  const years = differenceInYears(now, birth);
  const months = differenceInMonths(now, birth) % 12;

  if (years === 0) {
    return `${months} ${months === 1 ? 'mes' : 'meses'}`;
  }
  if (months === 0) {
    return `${years} ${years === 1 ? 'año' : 'años'}`;
  }
  return `${years} ${years === 1 ? 'año' : 'años'} y ${months} ${months === 1 ? 'mes' : 'meses'}`;
}

const PetDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const pet = mockPets.find(p => p.id === id);

  if (!pet) {
    return (
      <Layout>
        <div className="text-center py-16">
          <p className="text-2xl font-bold mb-4">Mascota no encontrada</p>
          <Link to="/pets">
            <Button variant="outline">Volver a mis mascotas</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  const petVaccines = mockVaccines.filter(v => v.petId === pet.id);
  const petAppointments = mockAppointments.filter(a => a.petId === pet.id);
  const petAllergies = mockAllergies.filter(a => a.petId === pet.id);
  const petDewormings = mockDewormings.filter(d => d.petId === pet.id);

  return (
    <Layout>
      {/* Back button */}
      <Link to="/pets" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4" />
        Volver a mis mascotas
      </Link>

      {/* Pet Header */}
      <div className="relative rounded-3xl overflow-hidden mb-8">
        <div className="h-64 md:h-80">
          <img
            src={pet.imageUrl}
            alt={pet.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-4xl md:text-5xl font-extrabold text-primary-foreground">
                  {pet.name}
                </h1>
                <span className="text-3xl">{speciesEmoji[pet.species]}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary" className="bg-card/90 text-card-foreground">
                  {speciesLabel[pet.species]}
                </Badge>
                <Badge variant="secondary" className="bg-card/90 text-card-foreground">
                  {pet.breed}
                </Badge>
              </div>
            </div>
            <Button variant="secondary" className="gap-2">
              <Edit className="w-4 h-4" />
              Editar perfil
            </Button>
          </div>
        </div>
      </div>

      {/* Pet Info Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-3 rounded-xl bg-primary/10">
              <Cake className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Edad</p>
              <p className="font-semibold">{calculateAge(pet.birthDate)}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-3 rounded-xl bg-primary/10">
              <Weight className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Peso</p>
              <p className="font-semibold">{pet.weight} kg</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-3 rounded-xl bg-primary/10">
              <Calendar className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Nacimiento</p>
              <p className="font-semibold">{format(new Date(pet.birthDate), "dd/MM/yyyy")}</p>
            </div>
          </CardContent>
        </Card>
        {pet.microchipId && (
          <Card>
            <CardContent className="p-4 flex items-center gap-3">
              <div className="p-3 rounded-xl bg-primary/10">
                <Microchip className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Microchip</p>
                <p className="font-semibold font-mono text-xs">{pet.microchipId}</p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Tabs */}
      <Tabs defaultValue="vaccines" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 h-auto p-1">
          <TabsTrigger value="vaccines" className="gap-2 py-3">
            <Syringe className="w-4 h-4" />
            <span className="hidden sm:inline">Vacunas</span>
          </TabsTrigger>
          <TabsTrigger value="appointments" className="gap-2 py-3">
            <Calendar className="w-4 h-4" />
            <span className="hidden sm:inline">Citas</span>
          </TabsTrigger>
          <TabsTrigger value="deworming" className="gap-2 py-3">
            <Bug className="w-4 h-4" />
            <span className="hidden sm:inline">Desparasitación</span>
          </TabsTrigger>
          <TabsTrigger value="allergies" className="gap-2 py-3">
            <AlertTriangle className="w-4 h-4" />
            <span className="hidden sm:inline">Alergias</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="vaccines" className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">Historial de Vacunas</h2>
            <Button variant="outline" className="gap-2">
              <Syringe className="w-4 h-4" />
              Agregar vacuna
            </Button>
          </div>
          {petVaccines.length > 0 ? (
            <div className="grid gap-4">
              {petVaccines.map(vaccine => (
                <VaccineCard key={vaccine.id} vaccine={vaccine} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              <Syringe className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>No hay vacunas registradas</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="appointments" className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">Citas Veterinarias</h2>
            <Button variant="outline" className="gap-2">
              <Calendar className="w-4 h-4" />
              Agendar cita
            </Button>
          </div>
          {petAppointments.length > 0 ? (
            <div className="grid gap-4">
              {petAppointments.map(apt => (
                <AppointmentCard key={apt.id} appointment={apt} pet={pet} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              <Calendar className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>No hay citas registradas</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="deworming" className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">Control de Desparasitación</h2>
            <Button variant="outline" className="gap-2">
              <Bug className="w-4 h-4" />
              Agregar registro
            </Button>
          </div>
          {petDewormings.length > 0 ? (
            <div className="grid gap-4">
              {petDewormings.map(deworming => (
                <DewormingCard key={deworming.id} deworming={deworming} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              <Bug className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>No hay registros de desparasitación</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="allergies" className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">Alergias Conocidas</h2>
            <Button variant="outline" className="gap-2">
              <AlertTriangle className="w-4 h-4" />
              Agregar alergia
            </Button>
          </div>
          {petAllergies.length > 0 ? (
            <div className="grid gap-4">
              {petAllergies.map(allergy => (
                <AllergyCard key={allergy.id} allergy={allergy} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              <AlertTriangle className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>No hay alergias registradas</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </Layout>
  );
};

export default PetDetailPage;
