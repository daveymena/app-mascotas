import { Appointment } from '@/types/pet';
import { Pet } from '@/types/pet';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, MapPin, User } from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

interface AppointmentCardProps {
  appointment: Appointment;
  pet: Pet;
}

const typeLabels: Record<Appointment['type'], string> = {
  checkup: 'Revisión',
  vaccine: 'Vacunación',
  surgery: 'Cirugía',
  emergency: 'Emergencia',
  grooming: 'Estética',
  other: 'Otro',
};

const typeColors: Record<Appointment['type'], string> = {
  checkup: 'bg-primary/15 text-primary',
  vaccine: 'bg-success/15 text-success',
  surgery: 'bg-warning/15 text-warning',
  emergency: 'bg-destructive/15 text-destructive',
  grooming: 'bg-accent/15 text-accent',
  other: 'bg-muted text-muted-foreground',
};

export function AppointmentCard({ appointment, pet }: AppointmentCardProps) {
  const appointmentDate = new Date(appointment.date);
  const isUpcoming = appointmentDate >= new Date();

  return (
    <Card className="animate-fade-in">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={pet.imageUrl}
              alt={pet.name}
              className="w-10 h-10 rounded-full object-cover ring-2 ring-primary/20"
            />
            <div>
              <CardTitle className="text-base">{pet.name}</CardTitle>
              <p className="text-sm text-muted-foreground">{pet.breed}</p>
            </div>
          </div>
          <Badge className={typeColors[appointment.type]}>
            {typeLabels[appointment.type]}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="w-4 h-4 text-primary" />
            <span className="font-medium">
              {format(appointmentDate, "EEEE, d 'de' MMMM", { locale: es })}
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="w-4 h-4" />
            <span>{appointment.time}h</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <User className="w-4 h-4" />
            <span>{appointment.veterinarian}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="w-4 h-4" />
            <span>{appointment.clinic}</span>
          </div>
          {appointment.notes && (
            <p className="text-sm text-muted-foreground pt-2 border-t border-border">
              {appointment.notes}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
