import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useState } from 'react';
import api from '@/lib/api';

const TestConnectionPage = () => {
  const [result, setResult] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const testConnection = async () => {
    setIsLoading(true);
    setResult('Probando conexión...');
    
    try {
      // Probar endpoint básico
      const healthResponse = await fetch('http://localhost:5000');
      const healthData = await healthResponse.json();
      setResult(prev => prev + '\n✅ Servidor principal: ' + JSON.stringify(healthData));
      
      // Probar endpoint de mascotas
      const petsResponse = await fetch('http://localhost:5000/api/pets');
      const petsData = await petsResponse.json();
      setResult(prev => prev + '\n✅ Endpoint mascotas: ' + JSON.stringify(petsData));
      
      // Probar con axios
      const axiosResponse = await api.get('/pets');
      setResult(prev => prev + '\n✅ Axios API: ' + JSON.stringify(axiosResponse.data));
      
    } catch (error) {
      setResult(prev => prev + '\n❌ Error: ' + (error as Error).message);
      console.error('Error completo:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>🔧 Prueba de Conectividad</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button onClick={testConnection} disabled={isLoading}>
            {isLoading ? 'Probando...' : 'Probar Conexión'}
          </Button>
          
          {result && (
            <div className="bg-gray-100 p-4 rounded-md">
              <pre className="whitespace-pre-wrap text-sm">{result}</pre>
            </div>
          )}
        </CardContent>
      </Card>
    </Layout>
  );
};

export default TestConnectionPage;