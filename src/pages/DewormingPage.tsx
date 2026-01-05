import { Layout } from '@/components/layout/Layout';
import { DewormingCard } from '@/components/health/DewormingCard';
import { mockDewormings, mockPets } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Plus, Bug } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useState } from 'react';

const DewormingPage = () => {
  const [selectedPet, setSelectedPet] = useState<string>('all');

  const filteredDewormings = selectedPet === 'all' 
    ? mockDewormings 
    : mockDewormings.filter(d => d.petId === selectedPet);

  return (
    <Layout>
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">Control de Desparasitación</h1>
            <p className="text-muted-foreground">
              Mantén a tus mascotas protegidas con un control regular
            </p>
          </div>
          <Button variant="hero" size="lg" className="gap-2">
            <Plus className="w-5 h-5" />
            Agregar registro
          </Button>
        </div>

        {/* Filter by pet */}
        <div className="flex items-center gap-4">
          <span className="text-sm text-muted-foreground">Filtrar por mascota:</span>
          <Select value={selectedPet} onValueChange={setSelectedPet}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Todas las mascotas" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas las mascotas</SelectItem>
              {mockPets.map(pet => (
                <SelectItem key={pet.id} value={pet.id}>{pet.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {filteredDewormings.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2">
          {filteredDewormings.map(deworming => {
            const pet = mockPets.find(p => p.id === deworming.petId);
            return (
              <div key={deworming.id}>
                {selectedPet === 'all' && pet && (
                  <p className="text-sm font-medium text-muted-foreground mb-2 flex items-center gap-2">
                    <img src={pet.imageUrl} alt={pet.name} className="w-6 h-6 rounded-full object-cover" />
                    {pet.name}
                  </p>
                )}
                <DewormingCard deworming={deworming} />
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-16">
          <Bug className="w-16 h-16 mx-auto mb-4 text-muted-foreground/50" />
          <p className="text-lg text-muted-foreground mb-4">No hay registros de desparasitación</p>
          <Button variant="outline">Agregar primer registro</Button>
        </div>
      )}
    </Layout>
  );
};

export default DewormingPage;
