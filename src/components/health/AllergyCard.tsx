import { Allergy } from '@/types/pet';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle } from 'lucide-react';

interface AllergyCardProps {
  allergy: Allergy;
}

const severityLabels: Record<Allergy['severity'], string> = {
  mild: 'Leve',
  moderate: 'Moderada',
  severe: 'Severa',
};

export function AllergyCard({ allergy }: AllergyCardProps) {
  return (
    <Card className="animate-fade-in border-l-4 border-l-warning">
      <CardContent className="p-4">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-xl bg-warning/15">
            <AlertTriangle className="w-5 h-5 text-warning" />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-semibold">{allergy.allergen}</h4>
              <Badge variant={allergy.severity}>{severityLabels[allergy.severity]}</Badge>
            </div>
            <div className="flex flex-wrap gap-2 mb-2">
              {allergy.symptoms.map((symptom, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {symptom}
                </Badge>
              ))}
            </div>
            {allergy.notes && (
              <p className="text-sm text-muted-foreground">{allergy.notes}</p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
