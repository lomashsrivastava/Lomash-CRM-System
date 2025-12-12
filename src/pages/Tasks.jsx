import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, CheckCircle, Circle, Calendar, Trash2, Tag, Filter, User, BarChart } from 'lucide-react';
import useLocalStorage from '../hooks/useLocalStorage';
import Button from '../components/Button';
import Input from '../components/Input';
import Modal from '../components/Modal';
import GlassCard from '../components/GlassCard';
import { v4 as uuidv4 } from 'uuid';
import { format } from 'date-fns';

const Tasks = () => {
    const [tasks, setTasks] = useLocalStorage('crm_tasks', [
        { id: '1', title: 'Follow up with Acme Corp', dueDate: '2023-12-25', priority: 'High', status: 'Pending', assignee: 'Alice', progress: 30 },
        { id: '2', title: 'Prepare monthly report', dueDate: '2023-12-28', priority: 'Medium', status: 'Done', assignee: 'Bob', progress: 100 }
    ]);
    const [filter, setFilter] = useState('All'); // All, Pending, Done
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({ title: '', dueDate: '', priority: 'Medium', assignee: 'Alice', progress: 0 });

    const Priorities = {
        High: 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400',
        Medium: 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400',
        Low: 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400'
    };

    const Avatars = {
        Alice: 'bg-pink-500',
        Bob: 'bg-indigo-500',
        Charlie: 'bg-purple-500',
        Diana: 'bg-green-500'
    };

    const toggleStatus = (id) => {
        setTasks(tasks.map(t => t.id === id ? { ...t, status: t.status === 'Pending' ? 'Done' : 'Pending', progress: t.status === 'Pending' ? 100 : t.progress } : t));
    };

    const deleteTask = (id) => {
        setTasks(tasks.filter(t => t.id !== id));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setTasks([...tasks, { ...formData, id: uuidv4(), status: 'Pending' }]);
        setIsModalOpen(false);
        setFormData({ title: '', dueDate: '', priority: 'Medium', assignee: 'Alice', progress: 0 });
    };

    const filteredTasks = tasks.filter(t => filter === 'All' ? true : t.status === filter);

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Project Tasks</h2>
                    <p className="text-gray-500 dark:text-gray-400">Manage deliverables and track progress</p>
                </div>
                <Button onClick={() => setIsModalOpen(true)} className="bg-indigo-600 text-white hover:bg-indigo-700">
                    <Plus size={18} className="mr-2 inline" /> Add Task
                </Button>
            </div>

            <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
                {['All', 'Pending', 'Done'].map(f => (
                    <button
                        key={f}
                        onClick={() => setFilter(f)}
                        className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all ${filter === f ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30 transform scale-105' : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-100'}`}
                    >
                        {f}
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                <AnimatePresence>
                    {filteredTasks.length === 0 ? (
                        <div className="col-span-full text-center py-20">
                            <p className="text-gray-400 text-lg">No tasks found</p>
                        </div>
                    ) : (
                        filteredTasks.map((task) => (
                            <GlassCard
                                key={task.id}
                                className="flex flex-col justify-between p-6 group h-full hover:shadow-2xl transition-all duration-300 border-t-4 border-transparent hover:border-indigo-500"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                            >
                                <div className="space-y-4">
                                    <div className="flex justify-between items-start">
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${Priorities[task.priority]}`}>{task.priority}</span>
                                        <div className="flex gap-2">
                                            <button onClick={() => toggleStatus(task.id)} className={`p-2 rounded-full transition-colors ${task.status === 'Done' ? 'text-green-500 bg-green-50 dark:bg-green-900/20' : 'text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'}`}>
                                                {task.status === 'Done' ? <CheckCircle size={20} /> : <Circle size={20} />}
                                            </button>
                                            <button onClick={() => deleteTask(task.id)} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full transition-colors">
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </div>

                                    <div>
                                        <h3 className={`text-lg font-bold text-gray-800 dark:text-white mb-2 ${task.status === 'Done' ? 'line-through opacity-60' : ''}`}>{task.title}</h3>
                                        <div className="flex items-center gap-2 text-sm text-gray-500">
                                            <Calendar size={14} className="text-gray-400" />
                                            {task.dueDate ? format(new Date(task.dueDate), 'MMM dd, yyyy') : 'No Date'}
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-700">
                                    <div className="flex justify-between items-end mb-2">
                                        <div className="flex items-center gap-2">
                                            <div className={`w-8 h-8 rounded-full ${Avatars[task.assignee] || 'bg-gray-400'} flex items-center justify-center text-white font-bold text-xs shadow-md border-2 border-white dark:border-gray-800`}>
                                                {task.assignee ? task.assignee.charAt(0) : 'U'}
                                            </div>
                                            <span className="text-xs font-semibold text-gray-600 dark:text-gray-400">{task.assignee}</span>
                                        </div>
                                        <span className="text-xs font-bold text-indigo-500">{task.progress}%</span>
                                    </div>
                                    <div className="h-2 w-full bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                                        <div
                                            className={`h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-1000 ease-out`}
                                            style={{ width: `${task.progress}%` }}
                                        />
                                    </div>
                                </div>
                            </GlassCard>
                        ))
                    )}
                </AnimatePresence>
            </div>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Create New Task">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <Input label="Task Title" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} required />

                    <div className="grid grid-cols-2 gap-4">
                        <Input label="Due Date" type="date" value={formData.dueDate} onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })} />
                        <div>
                            <label className="block text-sm font-medium mb-1 ml-1 text-gray-700 dark:text-gray-300">Priority</label>
                            <select
                                value={formData.priority}
                                onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                                className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            >
                                <option>Low</option>
                                <option>Medium</option>
                                <option>High</option>
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-1 ml-1 text-gray-700 dark:text-gray-300">Assignee</label>
                            <select
                                value={formData.assignee}
                                onChange={(e) => setFormData({ ...formData, assignee: e.target.value })}
                                className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            >
                                {Object.keys(Avatars).map(user => <option key={user}>{user}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1 ml-1 text-gray-700 dark:text-gray-300">Progress ({formData.progress}%)</label>
                            <input
                                type="range"
                                min="0"
                                max="100"
                                value={formData.progress}
                                onChange={(e) => setFormData({ ...formData, progress: parseInt(e.target.value) })}
                                className="w-full mt-3 accent-indigo-600 cursor-pointer"
                            />
                        </div>
                    </div>

                    <div className="flex justify-end pt-4">
                        <Button type="button" onClick={() => setIsModalOpen(false)} className="bg-gray-200 text-gray-700 mr-2">Cancel</Button>
                        <Button type="submit" className="bg-indigo-600 text-white">Create Task</Button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default Tasks;
