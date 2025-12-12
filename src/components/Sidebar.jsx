import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    LayoutDashboard, Users, UserPlus, CheckSquare, StickyNote, BarChart2, Settings, ChevronLeft, ChevronRight, LogOut,
    Calendar, Briefcase, FileText, Globe, DollarSign
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Sidebar = () => {
    const [collapsed, setCollapsed] = useState(false);
    const { logout } = useAuth();

    const menuItems = [
        { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
        { icon: Briefcase, label: 'Projects', path: '/projects' },
        { icon: Users, label: 'Customers', path: '/customers' },
        { icon: UserPlus, label: 'Leads', path: '/leads' },
        { icon: CheckSquare, label: 'Tasks', path: '/tasks' },
        { icon: CheckSquare, label: 'Tasks', path: '/tasks' },
        { icon: Calendar, label: 'Calendar', path: '/calendar' },
        { icon: Users, label: 'Employees', path: '/employees' },
        { icon: CheckSquare, label: 'Attendance', path: '/attendance' },
        { icon: DollarSign, label: 'Payroll', path: '/payroll' },
        { icon: StickyNote, label: 'Notes', path: '/notes' },
        { icon: BarChart2, label: 'Reports', path: '/reports' },
        { icon: Settings, label: 'Settings', path: '/settings' },
    ];

    return (
        <motion.div
            animate={{ width: collapsed ? 80 : 250 }}
            className="h-screen bg-white/80 dark:bg-gray-900/90 backdrop-blur-xl border-r border-white/20 dark:border-gray-700/50 flex flex-col relative z-20 shadow-xl transition-colors duration-300"
        >
            <div className="p-4 flex items-center justify-between border-b border-gray-200/50 dark:border-gray-700/50">
                <AnimatePresence>
                    {!collapsed && (
                        <motion.h1
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 tracking-tighter"
                        >
                            LOMASH CRM
                        </motion.h1>
                    )}
                </AnimatePresence>
                <button
                    onClick={() => setCollapsed(!collapsed)}
                    className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                    {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
                </button>
            </div>

            <nav className="flex-1 p-3 space-y-2 overflow-y-auto">
                {menuItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) => `
                flex items-center gap-4 px-4 py-4 rounded-2xl transition-all duration-300 group relative overflow-hidden
                ${isActive
                                ? 'bg-gradient-to-r from-indigo-500/10 to-purple-500/10 text-indigo-600 dark:text-indigo-400 font-bold shadow-sm'
                                : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800/80 font-medium'
                            }
`}
                    >
                        {({ isActive }) => (
                            <>
                                {isActive && (
                                    <motion.div
                                        layoutId="activeTab"
                                        className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-xl"
                                        initial={false}
                                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                    />
                                )}
                                <item.icon size={20} className={isActive ? 'text-indigo-500' : 'text-gray-500 group-hover:text-gray-700 dark:text-gray-400 dark:group-hover:text-gray-200'} />
                                <AnimatePresence>
                                    {!collapsed && (
                                        <motion.span
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -10 }}
                                            className="whitespace-nowrap"
                                        >
                                            {item.label}
                                        </motion.span>
                                    )}
                                </AnimatePresence>
                            </>
                        )}
                    </NavLink>
                ))}
            </nav>

            <div className="p-3 border-t border-gray-200/50 dark:border-gray-700/50">
                <button
                    onClick={logout}
                    className="flex items-center gap-3 px-3 py-3 w-full rounded-xl text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors"
                >
                    <LogOut size={20} />
                    <AnimatePresence>
                        {!collapsed && (
                            <motion.span
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                            >
                                Logout
                            </motion.span>
                        )}
                    </AnimatePresence>
                </button>
            </div>
        </motion.div>
    );
};

export default Sidebar;
