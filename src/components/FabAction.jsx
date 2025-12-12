import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, CheckSquare, Briefcase, StickyNote, X, Mic } from 'lucide-react';

const FabAction = () => {
    const [isOpen, setIsOpen] = useState(false);

    const actions = [
        { icon: Mic, label: 'Voice Note', color: 'bg-rose-500' },
        { icon: StickyNote, label: 'Add Note', color: 'bg-yellow-500' },
        { icon: CheckSquare, label: 'New Task', color: 'bg-green-500' },
        { icon: Briefcase, label: 'New Project', color: 'bg-indigo-500' },
    ];

    return (
        <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end gap-4">
            <AnimatePresence>
                {isOpen && (
                    <div className="flex flex-col gap-3 items-end mb-2">
                        {actions.map((action, index) => (
                            <motion.button
                                key={action.label}
                                initial={{ opacity: 0, scale: 0, x: 20 }}
                                animate={{ opacity: 1, scale: 1, x: 0 }}
                                exit={{ opacity: 0, scale: 0, x: 20 }}
                                transition={{ delay: index * 0.05 }}
                                className="flex items-center gap-3 group"
                                onClick={() => console.log('Action:', action.label)}
                            >
                                <span className="bg-white dark:bg-gray-800 px-3 py-1 rounded-lg text-sm font-semibold shadow-lg text-gray-700 dark:text-gray-200 group-hover:-translate-x-1 transition-transform">
                                    {action.label}
                                </span>
                                <div className={`${action.color} p-3 rounded-full text-white shadow-lg shadow-black/20 hover:scale-110 transition-transform`}>
                                    <action.icon size={20} />
                                </div>
                            </motion.button>
                        ))}
                    </div>
                )}
            </AnimatePresence>

            <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(!isOpen)}
                className={`p-4 rounded-full shadow-2xl text-white transition-colors duration-300 ${isOpen ? 'bg-red-500 rotate-45' : 'bg-gradient-to-r from-indigo-600 to-purple-600'}`}
            >
                {isOpen ? <X size={28} /> : <Plus size={28} />}
            </motion.button>
        </div>
    );
};

export default FabAction;
