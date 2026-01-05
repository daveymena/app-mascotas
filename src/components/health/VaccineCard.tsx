import { Vaccine } from '@/types/pet';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Syringe, Calendar, AlertCircle, CheckCircle2 } from 'lucide-react';
import { format, isPast, isFuture, differenceInDays } from 'date-fns';
import { es } from 'date-fns/locale';

interface VaccineCardProps {
  vaccine: Vaccine;
}

export function VaccineCard({ vaccine }: VaccineCardProps) {
  const nextDueDate = vaccine.nextDueDate ? new Date(vaccine.nextDueDate) : null;
  const daysUntilDue = nextDueDate ? differenceInDays(nextDueDate, new Date()) : null;
  const isOverdue = nextDueDate && isPast(nextDueDate);
  const isDueSoon = daysUntilDue !== null && daysUntilDue <= 30 && daysUntilDue > 0;

  return (
    <Card className="animate-fade-in">
      <CardContent className="p-4">
        <div className="flex items-start gap-4">
          <div className={`p-3 rounded-xl ${isOverdue ? 'bg-destructive/15' : isDueSoon ? 'bg-warning/15' : 'bg-success/15'}`}>
            <Syringe className={`w-5 h-5 ${isOverdue ? 'text-destructive' : isDueSoon ? 'text-warning' : 'text-success'}`} />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-semibold">{vaccine.name}</h4>
              {isOverdue ? (
                <Badge variant="destructive" className="gap-1">
                  <AlertCircle className="w-3 h-3" />
                  Vencida
                </Badge>
              ) : isDueSoon ? (
                <Badge variant="warning" className="gap-1">
                  <AlertCircle className="w-3 h-3" />
                  Próxima
                </Badge>
              ) : (
                <Badge variant="success" className="gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  Al día
                </Badge>
              )}
            </div>
            <div className="space-y-1 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>Aplicada: {format(new Date(vaccine.date), "d 'de' MMMM, yyyy", { locale: es })}</span>
              </div>
              {nextDueDate && (
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>Próxima: {format(nextDueDate, "d 'de' MMMM, yyyy", { locale: es })}</span>
                </div>
              )}
              <p className="text-muted-foreground">{vaccine.veterinarian}</p>
              {vaccine.batchNumber && (
                <p className="font-mono text-xs">Lote: {vaccine.batchNumber}</p>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
