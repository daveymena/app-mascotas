import { Pet } from '@/types/pet';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Weight, Microchip } from 'lucide-react';
import { format, differenceInYears, differenceInMonths } from 'date-fns';
import { es } from 'date-fns/locale';

interface PetCardProps {
  pet: Pet;
  onClick?: () => void;
}

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
  return `${years} ${years === 1 ? 'año' : 'años'}, ${months} ${months === 1 ? 'mes' : 'meses'}`;
}

export function PetCard({ pet, onClick }: PetCardProps) {
  return (
    <Card 
      className="overflow-hidden cursor-pointer group animate-fade-in"
      onClick={onClick}
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={pet.imageUrl}
          alt={pet.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-2xl font-bold text-primary-foreground mb-1">{pet.name}</h3>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="bg-card/90 text-card-foreground">
              {speciesEmoji[pet.species]} {speciesLabel[pet.species]}
            </Badge>
            <Badge variant="secondary" className="bg-card/90 text-card-foreground">
              {pet.breed}
            </Badge>
          </div>
        </div>
      </div>
      <CardContent className="p-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar className="w-4 h-4 text-primary" />
            <span className="text-sm">{calculateAge(pet.birthDate)}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Weight className="w-4 h-4 text-primary" />
            <span className="text-sm">{pet.weight} kg</span>
          </div>
          {pet.microchipId && (
            <div className="col-span-2 flex items-center gap-2 text-muted-foreground">
              <Microchip className="w-4 h-4 text-primary" />
              <span className="text-sm font-mono">{pet.microchipId}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
