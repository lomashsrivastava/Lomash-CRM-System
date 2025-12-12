import { motion } from 'framer-motion';
import GlassCard from './GlassCard';

const KPICard = ({ title, value, icon: Icon, trend, color, delay = 0 }) => {
    return (
        <GlassCard
            className="flex items-center justify-between p-6 relative overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay, duration: 0.4 }}
        >
            <div className="z-10">
                <p className="text-gray-500 dark:text-gray-400 text-sm font-medium mb-1">{title}</p>
                <h3 className="text-3xl font-bold text-gray-800 dark:text-white">{value}</h3>
                {trend && (
                    <p className={`text-xs mt-2 font-semibold ${trend > 0 ? 'text-green-500' : 'text-red-500'}`}>
                        {trend > 0 ? '+' : ''}{trend}% from last month
                    </p>
                )}
            </div>
            <div className={`p-4 rounded-full bg-${color}-500/10 text-${color}-500 z-10`}>
                <Icon size={28} className={`text-${color}-500`} />
            </div>

            {/* Decorative gradient blob */}
            <div className={`absolute -right-4 -bottom-4 w-24 h-24 bg-${color}-500/10 rounded-full blur-2xl`}></div>
        </GlassCard>
    );
};

export default KPICard;
