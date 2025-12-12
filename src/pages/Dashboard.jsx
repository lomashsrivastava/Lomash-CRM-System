import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    BarElement,
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import GlassCard from '../components/GlassCard';
import KPICard from '../components/KPICard';
import AiWidget from '../components/AiWidget';
import { Users, DollarSign, TrendingUp, Activity, Briefcase, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    BarElement
);

const Dashboard = () => {
    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { position: 'bottom', labels: { color: 'var(--text-secondary)', padding: 20, font: { size: 14 } } },
            title: { display: false },
        },
        scales: {
            y: { ticks: { color: 'var(--text-secondary)', font: { size: 12 } }, grid: { color: 'rgba(255,255,255,0.1)' } },
            x: { ticks: { color: 'var(--text-secondary)', font: { size: 12 } }, grid: { display: false } }
        }
    };

    const lineData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
            { label: 'Revenue', data: [12000, 19000, 3000, 5000, 20000, 30000], borderColor: 'rgb(244, 63, 94)', backgroundColor: 'rgba(244, 63, 94, 0.5)', tension: 0.4, borderWidth: 3, pointRadius: 4 },
            { label: 'Expenses', data: [8000, 12000, 10000, 9000, 15000, 18000], borderColor: 'rgb(139, 92, 246)', backgroundColor: 'rgba(139, 92, 246, 0.5)', tension: 0.4, borderWidth: 3, pointRadius: 4 },
        ],
    };

    const projectStatusData = {
        labels: ['Completed', 'In Progress', 'At Risk', 'On Hold'],
        datasets: [
            {
                data: [12, 19, 3, 5],
                backgroundColor: [
                    'rgba(16, 185, 129, 0.8)',
                    'rgba(99, 102, 241, 0.8)',
                    'rgba(239, 68, 68, 0.8)',
                    'rgba(245, 158, 11, 0.8)',
                ],
                borderWidth: 0,
            },
        ],
    };

    const teamMembers = [
        { name: 'Alice', role: 'Product Manager', progress: 85, color: 'bg-pink-500' },
        { name: 'Bob', role: 'Dev Lead', progress: 92, color: 'bg-indigo-500' },
        { name: 'Charlie', role: 'Designer', progress: 45, color: 'bg-purple-500' },
        { name: 'Diana', role: 'QA', progress: 70, color: 'bg-green-500' },
    ];

    const activeProjects = [
        { name: 'Website Redesign', client: 'Acme Corp', deadline: '2 days left', status: 'In Progress', color: 'text-indigo-500' },
        { name: 'Mobile App Launch', client: 'Globex', deadline: '1 week left', status: 'In Progress', color: 'text-blue-500' },
        { name: 'Q3 Marketing', client: 'Soylent', deadline: 'Overdue', status: 'At Risk', color: 'text-red-500' },
    ];

    return (
        <div className="space-y-8 pb-10">
            <div className="flex justify-between items-end">
                <div>
                    <h2 className="text-4xl font-extrabold text-gradient pb-2">Dashboard</h2>
                    <p className="text-lg text-gray-500 dark:text-gray-400 font-medium">Welcome back! Here's your project overview.</p>
                </div>
                <button className="neomorphic-btn text-sm">
                    <Clock size={18} /> Update Now
                </button>
            </div>

            {/* KPIs */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <KPICard title="Total Revenue" value="$54,230" icon={DollarSign} trend="+12.5%" color="text-green-500" />
                <KPICard title="Active Projects" value="12" icon={Briefcase} trend="+2" color="text-indigo-500" />
                <KPICard title="Tasks Completed" value="85%" icon={CheckCircle} trend="+5%" color="text-blue-500" />
                <KPICard title="Team Load" value="High" icon={Activity} trend="92%" color="text-orange-500" />
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Revenue Chart */}
                <GlassCard className="lg:col-span-2 min-h-[400px] flex flex-col">
                    <h3 className="text-xl font-bold mb-6 text-gray-800 dark:text-white flex items-center gap-2">
                        <TrendingUp size={24} className="text-pink-500" /> Financial Overview
                    </h3>
                    <div className="flex-1 relative w-full h-full">
                        <Line options={chartOptions} data={lineData} />
                    </div>
                </GlassCard>

                {/* Right Column Stack */}
                <div className="flex flex-col gap-8">
                    <AiWidget />
                    <GlassCard className="flex-1 flex flex-col min-h-[300px]">
                        <h3 className="text-xl font-bold mb-6 text-gray-800 dark:text-white">Project Status</h3>
                        <div className="flex-1 relative flex justify-center items-center p-4">
                            <Doughnut data={projectStatusData} options={{ maintainAspectRatio: false }} />
                        </div>
                    </GlassCard>
                </div>
            </div>

            {/* Bottom Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Active Projects List */}
                <GlassCard>
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xl font-bold text-gray-800 dark:text-white">Active Projects</h3>
                        <button className="text-indigo-500 text-sm font-semibold hover:underline">View All</button>
                    </div>
                    <div className="space-y-4">
                        {activeProjects.map((project, index) => (
                            <div key={index} className="flex items-center justify-between p-4 rounded-xl bg-white/50 dark:bg-gray-800/40 border border-gray-100 dark:border-gray-700 hover:bg-white/80 transition-colors">
                                <div className="flex items-center gap-4">
                                    <div className={`p-3 rounded-full bg-gray-100 dark:bg-gray-700 ${project.color}`}>
                                        <Briefcase size={20} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-800 dark:text-gray-100">{project.name}</h4>
                                        <p className="text-sm text-gray-500">{project.client}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${project.status === 'At Risk' ? 'bg-red-100 text-red-600' : 'bg-indigo-100 text-indigo-600'}`}>
                                        {project.status}
                                    </span>
                                    <p className="text-xs text-gray-400 mt-1">{project.deadline}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </GlassCard>

                {/* Team Workload */}
                <GlassCard>
                    <h3 className="text-xl font-bold mb-6 text-gray-800 dark:text-white">Team Workload</h3>
                    <div className="space-y-6">
                        {teamMembers.map((member, index) => (
                            <div key={index}>
                                <div className="flex justify-between mb-2">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-8 h-8 rounded-full ${member.color} flex items-center justify-center text-white font-bold text-xs`}>
                                            {member.name.charAt(0)}
                                        </div>
                                        <div>
                                            <p className="font-bold text-gray-800 dark:text-white text-sm">{member.name}</p>
                                            <p className="text-xs text-gray-500">{member.role}</p>
                                        </div>
                                    </div>
                                    <span className="font-bold text-gray-700 dark:text-gray-300">{member.progress}%</span>
                                </div>
                                <div className="h-2 w-full bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${member.progress}%` }}
                                        transition={{ duration: 1, delay: 0.2 }}
                                        className={`h-full ${member.color.replace('bg-', 'bg-')}`}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </GlassCard>
            </div>
        </div>
    );
};

export default Dashboard;
