import { motion } from 'framer-motion';
import { Sparkles, TrendingUp, AlertTriangle, Zap } from 'lucide-react';
import GlassCard from './GlassCard';

const AiWidget = () => {
    return (
        <GlassCard className="border-t-4 border-t-purple-500 bg-gradient-to-b from-purple-500/5 to-transparent">
            <div className="flex items-center gap-2 mb-4">
                <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                    <Sparkles className="text-purple-600 dark:text-purple-400" size={24} />
                </div>
                <div>
                    <h3 className="text-lg font-bold text-gray-800 dark:text-white">Lomash AI Insights</h3>
                    <p className="text-xs text-purple-600 dark:text-purple-400 font-semibold uppercase tracking-wider">High-Tech Analysis</p>
                </div>
            </div>

            <div className="space-y-3">
                <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="p-3 bg-green-50 dark:bg-green-900/10 border border-green-100 dark:border-green-800 rounded-xl flex items-start gap-3"
                >
                    <TrendingUp className="text-green-500 shrink-0 mt-0.5" size={18} />
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                        <span className="font-bold text-gray-900 dark:text-white">Productivity Spike:</span> Team efficiency is up <span className="text-green-600 font-bold">14%</span> this week based on task completion rates.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="p-3 bg-amber-50 dark:bg-amber-900/10 border border-amber-100 dark:border-amber-800 rounded-xl flex items-start gap-3"
                >
                    <AlertTriangle className="text-amber-500 shrink-0 mt-0.5" size={18} />
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                        <span className="font-bold text-gray-900 dark:text-white">Risk Detected:</span> "Globex Mobile App" deadline is approaching. Recommendation: Reallocate 2 devs.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="p-3 bg-indigo-50 dark:bg-indigo-900/10 border border-indigo-100 dark:border-indigo-800 rounded-xl flex items-start gap-3"
                >
                    <Zap className="text-indigo-500 shrink-0 mt-0.5" size={18} />
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                        <span className="font-bold text-gray-900 dark:text-white">Smart Action:</span> Auto-generated weekly report for "Acme Corp" is ready for review.
                    </p>
                </motion.div>
            </div>

            <button className="w-full mt-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-xl text-sm font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2">
                <Sparkles size={16} /> Ask AI Assistant
            </button>
        </GlassCard>
    );
};

export default AiWidget;
