import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import GlassCard from '../components/GlassCard';
import Button from '../components/Button';
import Input from '../components/Input';
import { Lock, Mail } from 'lucide-react';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        // Simulate network delay for animation
        setTimeout(() => {
            const result = login(formData.email, formData.password);
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
                        className="w-20 h-20 bg-gradient-to-tr from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-indigo-500/30"
                    >
                        <Lock className="w-10 h-10 text-white" />
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
                    <p className="text-indigo-100 font-medium">Next-Gen Project Management</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <Input
                        label={<span className="text-white">Email</span>}
                        type="email"
                        placeholder="admin@crm.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        icon={<Mail size={18} />}
                        required
                    />
                    <Input
                        label={<span className="text-white">Password</span>}
                        type="password"
                        placeholder="admin"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        icon={<Lock size={18} />}
                        required
                    />

                    {error && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            className="p-3 rounded bg-red-500/20 border border-red-500/50 text-red-100 text-sm text-center"
                        >
                            {error}
                        </motion.div>
                    )}

                    <Button type="submit" className="w-full bg-white text-[var(--primary)] hover:bg-gray-50" isLoading={loading}>
                        Sign In
                    </Button>
                </form>

                <div className="mt-6 text-center">
                    <p className="text-white/60 text-sm">
                        Don't have an account?{' '}
                        <Link to="/register" className="text-white font-semibold hover:underline">
                            Create Account
                        </Link>
                    </p>
                </div>

                <div className="mt-4 text-center">
                    <p className="text-xs text-white/40">Default Logic: admin@crm.com / admin</p>
                </div>
            </GlassCard>
        </div>
    );
};

export default Login;
