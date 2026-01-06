import { Layout } from '@/components/layout/Layout';
import SimpleAddPetForm from '@/components/pets/SimpleAddPetForm';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

const AddPetPage = () => {
  const navigate = useNavigate();

  const handleSuccess = () => {
    // Redirigir a la página de mascotas después de agregar exitosamente
    navigate('/pets');
  };

  const handleCancel = () => {
    navigate('/pets');
  };

  return (
    <Layout>
      <div className="mb-6">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/pets')}
          className="mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Volver a Mis Mascotas
        </Button>
      </div>

      <SimpleAddPetForm 
        onSuccess={handleSuccess}
        onCancel={handleCancel}
      />
    </Layout>
  );
};

export default AddPetPage;