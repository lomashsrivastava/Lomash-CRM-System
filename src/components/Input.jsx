import { motion } from 'framer-motion';

const Input = ({ label, error, ...props }) => {
    return (
        <div className="mb-4">
            {label && (
                <label className="block text-sm font-bold mb-1 ml-1 text-white drop-shadow-md tracking-wide">
                    {label}
                </label>
            )}
            <motion.input
                whileFocus={{ scale: 1.01 }}
                className="w-full px-4 py-3 rounded-lg bg-black/20 border border-white/30 text-white placeholder-white/70 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-white/80 transition-all font-semibold shadow-inner"
                {...props}
            />
            {error && (
                <motion.p
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-red-500 text-xs mt-1 ml-1"
                >
                    {error}
                </motion.p>
            )}
        </div>
    );
};

export default Input;
