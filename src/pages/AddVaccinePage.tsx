import { Layout } from '@/components/layout/Layout';
import AddVaccineForm from '@/components/vaccines/AddVaccineForm';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

const AddVaccinePage = () => {
  const navigate = useNavigate();

  const handleSuccess = () => {
    navigate('/vaccines');
  };

  const handleCancel = () => {
    navigate('/vaccines');
  };

  return (
    <Layout>
      <div className="mb-6">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/vaccines')}
          className="mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Volver a Vacunas
        </Button>
      </div>

      <AddVaccineForm 
        onSuccess={handleSuccess}
        onCancel={handleCancel}
      />
    </Layout>
  );
};

export default AddVaccinePage;