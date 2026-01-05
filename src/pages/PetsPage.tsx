import { Layout } from '@/components/layout/Layout';
import { PetCard } from '@/components/pets/PetCard';
import { mockPets } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Plus, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PetsPage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPets = mockPets.filter(pet =>
    pet.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    pet.breed.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Layout>
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">Mis Mascotas</h1>
            <p className="text-muted-foreground">
              Gestiona el perfil de salud de cada una de tus mascotas
            </p>
          </div>
          <Button variant="hero" size="lg" className="gap-2">
            <Plus className="w-5 h-5" />
            Agregar mascota
          </Button>
        </div>

        {/* Search */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="Buscar por nombre o raza..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPets.map((pet) => (
          <PetCard 
            key={pet.id} 
            pet={pet} 
            onClick={() => navigate(`/pets/${pet.id}`)}
          />
        ))}
      </div>

      {filteredPets.length === 0 && (
        <div className="text-center py-16">
          <p className="text-muted-foreground text-lg">No se encontraron mascotas</p>
        </div>
      )}
    </Layout>
  );
};

export default PetsPage;
