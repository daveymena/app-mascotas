import { Layout } from '@/components/layout/Layout';
import PricingPlans from '@/components/pricing/PricingPlans';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Check, ArrowRight, Star } from 'lucide-react';

const PricingPage = () => {
  const features = [
    'Historial médico completo',
    'Recordatorios automáticos',
    'Exportación de datos',
    'Soporte 24/7',
    'Sincronización en la nube',
    'Reportes detallados'
  ];

  const testimonials = [
    {
      name: 'María González',
      role: 'Dueña de 3 mascotas',
      content: 'Pet Health Hub me ha ayudado a mantener organizados todos los registros médicos de mis mascotas. ¡Indispensable!',
      rating: 5
    },
    {
      name: 'Dr. Carlos Ruiz',
      role: 'Veterinario',
      content: 'Recomiendo esta app a todos mis clientes. La información está siempre disponible y bien organizada.',
      rating: 5
    },
    {
      name: 'Ana Martín',
      role: 'Criadora profesional',
      content: 'Con 15 perros, necesitaba algo profesional. El plan Pro es perfecto para mi negocio.',
      rating: 5
    }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <div className="text-center py-16 bg-gradient-to-br from-blue-50 to-purple-50">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Cuida mejor a tus mascotas
        </h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Mantén un registro completo de la salud de tus mascotas con nuestra plataforma profesional
        </p>
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm">
              <Check className="w-4 h-4 text-green-500" />
              <span className="text-sm">{feature}</span>
            </div>
          ))}
        </div>
        <Button size="lg" className="gap-2">
          Ver Planes <ArrowRight className="w-4 h-4" />
        </Button>
      </div>

      {/* Pricing Plans */}
      <PricingPlans />

      {/* Testimonials */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Lo que dicen nuestros usuarios</h2>
            <p className="text-lg text-muted-foreground">
              Miles de dueños de mascotas confían en nosotros
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-white">
                <CardContent className="p-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4">"{testimonial.content}"</p>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="py-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Preguntas Frecuentes</h2>
          </div>

          <div className="space-y-6">
            {[
              {
                question: '¿Puedo cambiar de plan en cualquier momento?',
                answer: 'Sí, puedes actualizar o degradar tu plan en cualquier momento desde tu panel de usuario.'
              },
              {
                question: '¿Hay límite en el número de mascotas?',
                answer: 'El plan gratuito permite hasta 2 mascotas. Los planes Premium y Profesional no tienen límite.'
              },
              {
                question: '¿Mis datos están seguros?',
                answer: 'Absolutamente. Utilizamos encriptación de grado militar y cumplimos con todas las regulaciones de privacidad.'
              },
              {
                question: '¿Ofrecen reembolsos?',
                answer: 'Sí, ofrecemos garantía de reembolso de 30 días sin preguntas.'
              }
            ].map((faq, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">{faq.question}</h3>
                  <p className="text-muted-foreground">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Final */}
      <div className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center">
        <h2 className="text-3xl font-bold mb-4">¿Listo para empezar?</h2>
        <p className="text-xl mb-8 opacity-90">
          Únete a miles de dueños de mascotas que ya cuidan mejor a sus compañeros
        </p>
        <Button size="lg" variant="secondary" className="gap-2">
          Comenzar Gratis <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </Layout>
  );
};

export default PricingPage;