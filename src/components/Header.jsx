import { useState, useEffect } from 'react';
import { Bell, Search, Sun, Moon } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Header = () => {
    const { user } = useAuth();
    const [isDark, setIsDark] = useState(() => {
        if (typeof window !== 'undefined') {
            // Default to light currently, or check media query
            return document.documentElement.getAttribute('data-theme') === 'dark';
        }
        return false;
    });

    const toggleTheme = () => {
        const newTheme = !isDark;
        setIsDark(newTheme);
        document.documentElement.setAttribute('data-theme', newTheme ? 'dark' : 'light');
    };

    return (
        <header className="h-16 bg-white/50 dark:bg-gray-900/50 backdrop-blur-md border-b border-gray-200/50 dark:border-gray-700/50 flex items-center justify-between px-6 sticky top-0 z-10 transition-colors duration-300">
            <div className="flex items-center gap-4 w-96">
                <div className="relative w-full hidden md:block">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                        type="text"
                        placeholder="Search..."
                        className="w-full pl-10 pr-4 py-2 rounded-full bg-white/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all text-sm"
                    />
                </div>
            </div>

            <div className="flex items-center gap-4">
                <button
                    onClick={toggleTheme}
                    className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300 transition-colors"
                >
                    {isDark ? <Sun size={20} /> : <Moon size={20} />}
                </button>

                <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300 transition-colors relative">
                    <Bell size={20} />
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full indicator"></span>
                </button>

                <div className="flex items-center gap-3 pl-4 border-l border-gray-200 dark:border-gray-700">
                    <div className="text-right hidden sm:block">
                        <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">{user?.name}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">{user?.role}</p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 p-0.5">
                        <img
                            src={user?.avatar || "https://ui-avatars.com/api/?name=User"}
                            alt="User"
                            className="w-full h-full rounded-full object-cover border-2 border-white dark:border-gray-900"
                        />
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
