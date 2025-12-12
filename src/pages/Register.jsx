import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import GlassCard from '../components/GlassCard';
import Button from '../components/Button';
import Input from '../components/Input';
import { UserPlus, User, Mail, Lock } from 'lucide-react';

const Register = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        setTimeout(() => {
            const result = register(formData.name, formData.email, formData.password);
            if (result.success) {
                navigate('/');
            } else {
                setError(result.message);
                setLoading(false);
            }
        }, 800);
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-indigo-600 to-purple-700">
            <GlassCard className="w-full max-w-md p-8">
                <div className="text-center mb-8">
                    <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                        className="w-20 h-20 bg-gradient-to-tr from-pink-500 to-rose-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-rose-500/30"
                    >
                        <UserPlus className="w-10 h-10 text-white" />
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-white/80 mb-2 tracking-tight"
                    >
                        LOMASH CRM
                        <span className="block text-xl font-medium text-white/90 mt-1 tracking-widest">SYSTEM</span>
                    </motion.h1>
                    <p className="text-rose-100 font-medium">Join the Future of Work</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <Input
                        label={<span className="text-white">Full Name</span>}
                        type="text"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                    />
                    <Input
                        label={<span className="text-white">Email</span>}
                        type="email"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                    />
                    <Input
                        label={<span className="text-white">Password</span>}
                        type="password"
                        placeholder="******"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        required
                    />

                    {error && (
                        <div className="p-3 rounded bg-red-500/20 border border-red-500/50 text-red-100 text-sm text-center">
                            {error}
                        </div>
                    )}

                    <Button type="submit" className="w-full bg-white text-[var(--primary)] hover:bg-gray-50" isLoading={loading}>
                        Register
                    </Button>
                </form>

                <div className="mt-6 text-center">
                    <p className="text-white/60 text-sm">
                        Already have an account?{' '}
                        <Link to="/login" className="text-white font-semibold hover:underline">
                            Sign In
                        </Link>
                    </p>
                </div>
            </GlassCard>
        </div>
    );
};

export default Register;
