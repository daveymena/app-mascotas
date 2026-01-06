import { Layout } from '@/components/layout/Layout';
import { PetCard } from '@/components/pets/PetCard';
import { Button } from '@/components/ui/button';
import { Plus, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePets } from '@/hooks/usePetData';
import AdBanner from '@/components/ads/AdBanner';
import UpgradePrompt from '@/components/upgrade/UpgradePrompt';

const PetsPage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const { data: pets, isLoading, error } = usePets();

  const filteredPets = pets?.filter(pet =>
    pet.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    pet.breed?.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  // Simular plan del usuario (en producción vendría del contexto de auth)
  const userPlan = 'FREE';
  const petCount = filteredPets.length;

  return (
    <Layout>
      {/* Anuncio sutil en el header */}
      <AdBanner position="top" userPlan={userPlan} />

      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">Mis Mascotas</h1>
            <p className="text-muted-foreground">
              Gestiona el perfil de salud de cada una de tus mascotas
            </p>
          </div>
          <Button 
            variant="hero" 
            size="lg" 
            className="gap-2"
            onClick={() => navigate('/pets/add')}
          >
            <Plus className="w-5 h-5" />
            Agregar mascota
          </Button>
        </div>

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

      {/* Mostrar prompt de upgrade si el usuario tiene 2+ mascotas */}
      {petCount >= 2 && userPlan === 'FREE' && (
        <UpgradePrompt trigger="pet_limit" userPlan={userPlan} />
      )}

      {isLoading ? (
        <div className="text-center py-8">Cargando mascotas...</div>
      ) : error ? (
        <div className="text-center py-8 text-red-500">Error al cargar mascotas</div>
      ) : filteredPets.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-muted-foreground text-lg mb-4">No se encontraron mascotas</p>
          <Button onClick={() => navigate('/pets/add')}>
            <Plus className="w-4 h-4 mr-2" />
            Agregar Primera Mascota
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Contenido principal */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {filteredPets.map((pet) => (
                <PetCard
                  key={pet.id}
                  pet={pet}
                  onClick={() => navigate(`/pets/${pet.id}`)}
                />
              ))}
            </div>
          </div>

          {/* Sidebar con anuncio sutil */}
          <div className="lg:col-span-1">
            <AdBanner position="sidebar" userPlan={userPlan} />
            
            {/* Estadísticas rápidas */}
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-4 rounded-lg border border-blue-100">
              <h3 className="font-semibold text-sm text-blue-900 mb-3">Resumen</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-blue-700">Total mascotas:</span>
                  <span className="font-medium text-blue-900">{petCount}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-blue-700">Plan actual:</span>
                  <span className="font-medium text-blue-900">{userPlan}</span>
                </div>
                {userPlan === 'FREE' && (
                  <div className="text-xs text-blue-600 mt-2 p-2 bg-blue-100 rounded">
                    💡 Actualiza a Premium para mascotas ilimitadas
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Anuncio sutil en el footer */}
      <div className="mt-8">
        <AdBanner position="bottom" userPlan={userPlan} />
      </div>
    </Layout>
  );
};

export default PetsPage;
