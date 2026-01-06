import { Layout } from '@/components/layout/Layout';
import SimpleAddAppointmentForm from '@/components/appointments/SimpleAddAppointmentForm';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

const AddAppointmentPage = () => {
  const navigate = useNavigate();

  const handleSuccess = () => {
    navigate('/appointments');
  };

  const handleCancel = () => {
    navigate('/appointments');
  };

  return (
    <Layout>
      <div className="mb-6">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/appointments')}
          className="mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Volver a Citas
        </Button>
      </div>

      <SimpleAddAppointmentForm 
        onSuccess={handleSuccess}
        onCancel={handleCancel}
      />
    </Layout>
  );
};

export default AddAppointmentPage;