import { useState } from 'react';
import { Save, Upload, Moon, Sun, Monitor } from 'lucide-react';
import GlassCard from '../components/GlassCard';
import Button from '../components/Button';
import { useAuth } from '../context/AuthContext';

const Settings = () => {
    const { user } = useAuth();

    const handleExport = () => {
        const data = {};
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key.startsWith('crm_')) {
                data[key] = JSON.parse(localStorage.getItem(key));
            }
        }
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `crm_backup_${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    };

    const handleImport = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const data = JSON.parse(e.target.result);
                Object.keys(data).forEach(key => {
                    localStorage.setItem(key, JSON.stringify(data[key]));
                });
                alert('Data restored successfully! The page will reload.');
                window.location.reload();
            } catch (error) {
                alert('Error importing data: ' + error.message);
            }
        };
        reader.readAsText(file);
    };

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Settings</h2>
                <p className="text-gray-500 dark:text-gray-400">Configure your system preferences</p>
            </div>

            <GlassCard className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white border-b border-gray-100 dark:border-gray-700 pb-2">Data Management</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700">
                        <div className="flex items-center gap-3 mb-2">
                            <Save className="text-indigo-500" />
                            <h4 className="font-medium text-gray-800 dark:text-white">Export Data</h4>
                        </div>
                        <p className="text-sm text-gray-500 mb-4">Download a JSON backup of all your local CRM data.</p>
                        <Button onClick={handleExport} className="bg-indigo-600 text-white w-full">Export Backup</Button>
                    </div>

                    <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700">
                        <div className="flex items-center gap-3 mb-2">
                            <Upload className="text-green-500" />
                            <h4 className="font-medium text-gray-800 dark:text-white">Import Data</h4>
                        </div>
                        <p className="text-sm text-gray-500 mb-4">Restore your CRM data from a backup file (overwrites current).</p>
                        <label className="flex justify-center items-center w-full px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-600 transition">
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Select File</span>
                            <input type="file" accept=".json" onChange={handleImport} className="hidden" />
                        </label>
                    </div>
                </div>
            </GlassCard>

            <GlassCard className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white border-b border-gray-100 dark:border-gray-700 pb-2">Appearance</h3>
                <div className="flex items-center justify-between">
                    <div>
                        <h4 className="font-medium text-gray-800 dark:text-white">Dark Mode</h4>
                        <p className="text-sm text-gray-500">Toggle between light and dark themes</p>
                    </div>
                    <div className="flex gap-2">
                        <button onClick={() => document.documentElement.setAttribute('data-theme', 'light')} className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400">
                            <Sun size={20} />
                        </button>
                        <button onClick={() => document.documentElement.setAttribute('data-theme', 'dark')} className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400">
                            <Moon size={20} />
                        </button>
                    </div>
                </div>
            </GlassCard>
        </div>
    );
};

export default Settings;
