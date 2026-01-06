import { Layout } from '@/components/layout/Layout';

const TestPage = () => {
  return (
    <Layout>
      <div className="text-center py-8">
        <h1 className="text-3xl font-bold mb-4">🧪 Página de Prueba</h1>
        <p className="text-lg text-muted-foreground mb-6">
          Esta página funciona correctamente
        </p>
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
          ✅ El frontend está funcionando correctamente
        </div>
      </div>
    </Layout>
  );
};

export default TestPage;