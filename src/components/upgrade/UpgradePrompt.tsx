import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Crown, X, Sparkles, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface UpgradePromptProps {
  trigger: 'pet_limit' | 'export_limit' | 'reminder_limit' | 'storage_limit';
  userPlan: 'FREE' | 'PREMIUM' | 'PROFESSIONAL';
}

const UpgradePrompt = ({ trigger, userPlan }: UpgradePromptProps) => {
  const [isVisible, setIsVisible] = useState(true);
  const navigate = useNavigate();

  // No mostrar para usuarios premium
  if (userPlan !== 'FREE' || !isVisible) {
    return null;
  }

  const prompts = {
    pet_limit: {
      icon: <Crown className="w-5 h-5 text-yellow-500" />,
      title: '¿Más de 2 mascotas?',
      description: 'Actualiza a Premium para registrar mascotas ilimitadas',
      benefit: 'Mascotas ilimitadas + Sin anuncios',
      color: 'from-yellow-50 to-orange-50 border-yellow-200'
    },
    export_limit: {
      icon: <Sparkles className="w-5 h-5 text-purple-500" />,
      title: 'Exporta tus datos',
      description: 'Genera reportes PDF con el historial completo',
      benefit: 'Reportes PDF + Gráficos avanzados',
      color: 'from-purple-50 to-pink-50 border-purple-200'
    },
    reminder_limit: {
      icon: <Zap className="w-5 h-5 text-blue-500" />,
      title: 'Recordatorios automáticos',
      description: 'Nunca olvides una cita o vacuna importante',
      benefit: 'Recordatorios SMS + Email automático',
      color: 'from-blue-50 to-cyan-50 border-blue-200'
    },
    storage_limit: {
      icon: <Crown className="w-5 h-5 text-green-500" />,
      title: 'Más espacio para fotos',
      description: 'Guarda todas las fotos de tus mascotas sin límite',
      benefit: 'Almacenamiento ilimitado + Backup automático',
      color: 'from-green-50 to-emerald-50 border-green-200'
    }
  };

  const currentPrompt = prompts[trigger];

  return (
    <Card className={`bg-gradient-to-r ${currentPrompt.color} border-2 mb-6 relative overflow-hidden`}>
      <Button
        variant="ghost"
        size="sm"
        className="absolute top-2 right-2 h-6 w-6 p-0 text-gray-400 hover:text-gray-600"
        onClick={() => setIsVisible(false)}
      >
        <X className="h-3 w-3" />
      </Button>

      <CardContent className="p-4">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0">
            {currentPrompt.icon}
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-semibold text-sm text-gray-900">
                {currentPrompt.title}
              </h3>
              <Badge variant="secondary" className="text-xs">
                Premium
              </Badge>
            </div>
            
            <p className="text-sm text-gray-700 mb-2">
              {currentPrompt.description}
            </p>
            
            <p className="text-xs text-gray-600 mb-3">
              ✨ {currentPrompt.benefit}
            </p>
            
            <div className="flex items-center gap-2">
              <Button 
                size="sm" 
                className="h-7 text-xs"
                onClick={() => navigate('/pricing')}
              >
                Ver Premium
              </Button>
              <Button 
                size="sm" 
                variant="ghost" 
                className="h-7 text-xs text-gray-600"
                onClick={() => setIsVisible(false)}
              >
                Más tarde
              </Button>
            </div>
          </div>
        </div>
      </CardContent>

      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-20 h-20 opacity-10">
        <Crown className="w-full h-full" />
      </div>
    </Card>
  );
};

export default UpgradePrompt;