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
    RadialLinearScale,
} from 'chart.js';
import { Line, Bar, Doughnut, Radar } from 'react-chartjs-2';
import GlassCard from '../components/GlassCard';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    BarElement,
    RadialLinearScale
);

const Reports = () => {
    const chartOptions = {
        responsive: true,
        plugins: {
            legend: { position: 'top', labels: { color: 'var(--text-secondary)' } },
        },
        scales: {
            y: { ticks: { color: 'var(--text-secondary)' }, grid: { color: 'var(--glass-border)' } },
            x: { ticks: { color: 'var(--text-secondary)' }, grid: { color: 'var(--glass-border)' } }
        }
    };

    const salesData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
            { label: 'Revenue', data: [12000, 19000, 3000, 5000, 20000, 30000], borderColor: 'rgb(99, 102, 241)', backgroundColor: 'rgba(99, 102, 241, 0.5)' },
            { label: 'Target', data: [10000, 15000, 15000, 15000, 25000, 25000], borderColor: 'rgb(236, 72, 153)', borderDash: [5, 5] },
        ],
    };

    const performanceData = {
        labels: ['Sales', 'Marketing', 'Support', 'Development', 'HR', 'Admin'],
        datasets: [
            {
                label: 'Team Performance',
                data: [85, 70, 90, 80, 65, 75],
                backgroundColor: 'rgba(99, 102, 241, 0.2)',
                borderColor: 'rgba(99, 102, 241, 1)',
                borderWidth: 1,
            },
        ],
    };

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Reports & Analytics</h2>
                <p className="text-gray-500 dark:text-gray-400">Deep dive into your business metrics</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <GlassCard>
                    <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Revenue vs Target</h3>
                    <Line options={chartOptions} data={salesData} />
                </GlassCard>

                <GlassCard>
                    <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Department Performance</h3>
                    <Radar data={performanceData} options={{ ...chartOptions, scales: { r: { grid: { color: 'var(--glass-border)' } } } }} />
                </GlassCard>
            </div>
        </div>
    );
};

export default Reports;
