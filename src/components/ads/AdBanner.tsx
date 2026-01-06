import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { X, ExternalLink, Heart, Star } from 'lucide-react';

interface AdBannerProps {
  position: 'top' | 'sidebar' | 'bottom' | 'inline';
  userPlan: 'FREE' | 'PREMIUM' | 'PROFESSIONAL';
}

const AdBanner = ({ position, userPlan }: AdBannerProps) => {
  const [isVisible, setIsVisible] = useState(true);

  // No mostrar anuncios para usuarios premium
  if (userPlan !== 'FREE' || !isVisible) {
    return null;
  }

  const ads = {
    top: {
      title: '🐕 Nutrición Premium',
      description: 'Alimento natural con 15% de descuento para nuevos clientes',
      image: '/api/placeholder/80/60',
      link: '#',
      size: 'h-16',
      style: 'subtle'
    },
    sidebar: {
      title: '🏥 Encuentra tu veterinario',
      description: 'Conecta con profesionales cerca de ti',
      image: '/api/placeholder/120/80',
      link: '#',
      size: 'h-32',
      style: 'card'
    },
    bottom: {
      title: '📱 ¿Te gusta Pet Health Hub?',
      description: 'Ayúdanos calificando la app',
      image: '/api/placeholder/60/60',
      link: '#',
      size: 'h-14',
      style: 'minimal'
    },
    inline: {
      title: '💝 Productos recomendados',
      description: 'Basado en el perfil de tus mascotas',
      image: '/api/placeholder/100/80',
      link: '#',
      size: 'h-24',
      style: 'native'
    }
  };

  const currentAd = ads[position];

  // Estilo sutil para el header
  if (position === 'top') {
    return (
      <div className="bg-gradient-to-r from-blue-50 to-green-50 border-l-4 border-blue-200 p-3 mb-4 rounded-r-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Heart className="w-4 h-4 text-blue-500" />
            <div>
              <p className="text-sm font-medium text-blue-900">{currentAd.title}</p>
              <p className="text-xs text-blue-700">{currentAd.description}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button size="sm" variant="outline" className="h-7 text-xs">
              Ver oferta
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0 text-gray-400 hover:text-gray-600"
              onClick={() => setIsVisible(false)}
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Estilo de tarjeta para sidebar
  if (position === 'sidebar') {
    return (
      <Card className="p-4 mb-6 bg-gradient-to-br from-purple-50 to-pink-50 border-purple-100">
        <Button
          variant="ghost"
          size="sm"
          className="absolute top-2 right-2 h-6 w-6 p-0 text-gray-400"
          onClick={() => setIsVisible(false)}
        >
          <X className="h-3 w-3" />
        </Button>
        
        <div className="text-center">
          <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <Heart className="w-8 h-8 text-purple-500" />
          </div>
          <h3 className="font-semibold text-sm text-purple-900 mb-1">{currentAd.title}</h3>
          <p className="text-xs text-purple-700 mb-3">{currentAd.description}</p>
          <Button size="sm" className="w-full bg-purple-500 hover:bg-purple-600">
            Explorar
          </Button>
        </div>
        
        <div className="text-center mt-2">
          <span className="text-xs text-gray-400">Patrocinado</span>
        </div>
      </Card>
    );
  }

  // Estilo minimal para footer
  if (position === 'bottom') {
    return (
      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100 mb-4">
        <div className="flex items-center gap-3">
          <Star className="w-4 h-4 text-yellow-500" />
          <div>
            <p className="text-sm font-medium text-gray-800">{currentAd.title}</p>
            <p className="text-xs text-gray-600">{currentAd.description}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button size="sm" variant="ghost" className="h-7 text-xs text-blue-600">
            ⭐ Calificar
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-6 w-6 p-0 text-gray-400"
            onClick={() => setIsVisible(false)}
          >
            <X className="h-3 w-3" />
          </Button>
        </div>
      </div>
    );
  }

  // Estilo nativo para contenido inline
  if (position === 'inline') {
    return (
      <Card className="p-4 my-6 bg-gradient-to-r from-green-50 to-blue-50 border-green-100">
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-xs text-green-700 font-medium">Recomendado para ti</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="h-5 w-5 p-0 text-gray-400"
            onClick={() => setIsVisible(false)}
          >
            <X className="h-3 w-3" />
          </Button>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="w-16 h-12 bg-green-100 rounded-lg flex items-center justify-center">
            <Heart className="w-6 h-6 text-green-600" />
          </div>
          <div className="flex-1">
            <h3 className="font-medium text-sm text-green-900 mb-1">{currentAd.title}</h3>
            <p className="text-xs text-green-700 mb-2">{currentAd.description}</p>
            <Button size="sm" variant="outline" className="h-7 text-xs border-green-200 text-green-700 hover:bg-green-50">
              Ver productos <ExternalLink className="w-3 h-3 ml-1" />
            </Button>
          </div>
        </div>
        
        <div className="text-right mt-2">
          <span className="text-xs text-gray-400">Contenido patrocinado</span>
        </div>
      </Card>
    );
  }

  return null;
};

export default AdBanner;