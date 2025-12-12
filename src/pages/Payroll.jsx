import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { DollarSign, Wallet, Calendar, Download, TrendingUp } from 'lucide-react';
import useLocalStorage from '../hooks/useLocalStorage';
import GlassCard from '../components/GlassCard';

const Payroll = () => {
    const [employees] = useLocalStorage('crm_employees', []);
    const [attendance] = useLocalStorage('crm_attendance', {});
    const [selectedMonth, setSelectedMonth] = useState(new Date().toISOString().slice(0, 7)); // YYYY-MM

    const payrollData = useMemo(() => {
        return employees.map(emp => {
            // Calculate Present Days for selected Month
            let presentDays = 0;
            const daysInMonth = 30; // Standardize for simplicity

            Object.entries(attendance).forEach(([date, records]) => {
                if (date.startsWith(selectedMonth) && records[emp.id] === 'Present') {
                    presentDays++;
                }
            });

            const baseSalary = parseFloat(emp.baseSalary) || 0;
            const dailyRate = baseSalary / 30;
            const netSalary = Math.round(dailyRate * presentDays);

            return { ...emp, presentDays, netSalary, status: netSalary > 0 ? 'Processed' : 'Pending' };
        });
    }, [employees, attendance, selectedMonth]);

    const totalPayout = payrollData.reduce((acc, curr) => acc + curr.netSalary, 0);

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-end">
                <div>
                    <h2 className="text-4xl font-extrabold text-gradient bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-orange-500">Auto-Payroll</h2>
                    <p className="text-lg text-gray-500 dark:text-gray-400 font-medium">Automatic salary calculation based on attendance.</p>
                </div>
                <div className="flex items-center gap-4">
                    <input
                        type="month"
                        value={selectedMonth}
                        onChange={(e) => setSelectedMonth(e.target.value)}
                        className="px-4 py-2 rounded-xl bg-white/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <GlassCard className="bg-gradient-to-br from-amber-500/10 to-orange-500/10 border-amber-500/20">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-amber-500 rounded-2xl text-white shadow-lg shadow-amber-500/30">
                            <Wallet size={24} />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400 font-bold uppercase">Total Payout</p>
                            <h3 className="text-3xl font-black text-gray-800 dark:text-white">${totalPayout.toLocaleString()}</h3>
                        </div>
                    </div>
                </GlassCard>
                <GlassCard>
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-blue-500 rounded-2xl text-white shadow-lg shadow-blue-500/30">
                            <Calendar size={24} />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400 font-bold uppercase">Pay Period</p>
                            <h3 className="text-xl font-bold text-gray-800 dark:text-white">{selectedMonth}</h3>
                        </div>
                    </div>
                </GlassCard>
                <GlassCard>
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-green-500 rounded-2xl text-white shadow-lg shadow-green-500/30">
                            <TrendingUp size={24} />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400 font-bold uppercase">Employees Paid</p>
                            <h3 className="text-3xl font-black text-gray-800 dark:text-white">{payrollData.filter(p => p.netSalary > 0).length} <span className="text-sm text-gray-400 font-medium">/ {employees.length}</span></h3>
                        </div>
                    </div>
                </GlassCard>
            </div>

            <GlassCard>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 text-sm uppercase tracking-wider">
                                <th className="p-4">Employee</th>
                                <th className="p-4">Base Salary</th>
                                <th className="p-4">Attendance</th>
                                <th className="p-4">Net Pay</th>
                                <th className="p-4">Status</th>
                                <th className="p-4">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {payrollData.length === 0 ? (
                                <tr><td colSpan="6" className="p-8 text-center text-gray-500">No data available.</td></tr>
                            ) : (
                                payrollData.map((data, index) => (
                                    <motion.tr
                                        key={data.id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                        className="border-b border-gray-100 dark:border-gray-800 last:border-0 hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition-colors"
                                    >
                                        <td className="p-4">
                                            <div className="font-bold text-gray-800 dark:text-white">{data.name}</div>
                                            <div className="text-xs text-gray-400">{data.role}</div>
                                        </td>
                                        <td className="p-4 font-mono text-gray-600 dark:text-gray-300">
                                            ${Number(data.baseSalary).toLocaleString()}
                                        </td>
                                        <td className="p-4">
                                            <span className="inline-block px-2 py-1 rounded-lg bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400 font-bold text-xs">
                                                {data.presentDays} Days
                                            </span>
                                        </td>
                                        <td className="p-4">
                                            <div className="flex items-center gap-1 font-black text-lg text-emerald-600 dark:text-emerald-400">
                                                <DollarSign size={16} strokeWidth={3} />
                                                {data.netSalary.toLocaleString()}
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <span className={`px-2 py-1 rounded-full text-xs font-bold ${data.netSalary > 0 ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'}`}>
                                                {data.status}
                                            </span>
                                        </td>
                                        <td className="p-4">
                                            <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-gray-500 hover:text-indigo-500 transition-colors" title="Download Payslip">
                                                <Download size={18} />
                                            </button>
                                        </td>
                                    </motion.tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </GlassCard>
        </div>
    );
};

export default Payroll;
