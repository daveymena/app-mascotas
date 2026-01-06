import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/api';
import { Pet, Appointment } from '@/types/pet';
import { toast } from 'sonner';

// Pets Hooks
export const usePets = () => {
    return useQuery<Pet[]>({
        queryKey: ['pets'],
        queryFn: async () => {
            const { data } = await api.get('/pets');
            return data;
        },
    });
};

export const usePetDetails = (id: string) => {
    return useQuery<Pet>({
        queryKey: ['pet', id],
        queryFn: async () => {
            const { data } = await api.get(`/pets/${id}`);
            return data;
        },
        enabled: !!id,
    });
};

export const useCreatePet = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (newPet: any) => {
            const { data } = await api.post('/pets', newPet);
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['pets'] });
            toast.success("Mascota agregada exitosamente");
        },
        onError: () => {
            toast.error("Error al agregar mascota");
        }
    });
};

// Appointments Hooks
export const useAppointments = () => {
    return useQuery<Appointment[]>({
        queryKey: ['appointments'],
        queryFn: async () => {
            const { data } = await api.get('/appointments');
            return data;
        },
    });
};

// ... Add hooks for Vaccines, etc. as needed

export const useCreateVaccine = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (data: any) => api.post('/medical/vaccines', data),
        onSuccess: (_, variables) => queryClient.invalidateQueries({ queryKey: ['pet', variables.petId] }),
    });
};

export const useCreateDeworming = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (data: any) => api.post('/medical/deworming', data),
        onSuccess: (_, variables) => queryClient.invalidateQueries({ queryKey: ['pet', variables.petId] }),
    });
};

export const useCreateAllergy = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (data: any) => api.post('/medical/allergies', data),
        onSuccess: (_, variables) => queryClient.invalidateQueries({ queryKey: ['pet', variables.petId] }),
    });
};
