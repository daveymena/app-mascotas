import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import api from '@/lib/api';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await api.post('/auth/login', formData);
            localStorage.setItem('token', response.data.token);
            toast.success("Inicio de sesión exitoso");
            navigate('/pets');
        } catch (error) {
            toast.error("Error al iniciar sesión");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-xl shadow-lg">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Iniciar Sesión
                    </h2>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="rounded-md shadow-sm space-y-4">
                        <div>
                            <Input
                                type="email"
                                placeholder="Correo electrónico"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                required
                            />
                        </div>
                        <div>
                            <Input
                                type="password"
                                placeholder="Contraseña"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <Button type="submit" className="w-full">
                            Ingresar
                        </Button>
                    </div>
                    <div className="text-center">
                        <Link to="/register" className="text-sm text-blue-600 hover:text-blue-500">
                            ¿No tienes cuenta? Regístrate
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
