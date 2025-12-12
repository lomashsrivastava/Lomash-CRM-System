import { useState } from 'react';
import { Plus, Folder, MoreVertical, Clock, CheckCircle, AlertTriangle } from 'lucide-react';
import GlassCard from '../components/GlassCard';
import Button from '../components/Button';
import Modal from '../components/Modal';
import Input from '../components/Input';
import useLocalStorage from '../hooks/useLocalStorage';
import { v4 as uuidv4 } from 'uuid';
import ExcelUploader from '../components/ExcelUploader';

const Projects = () => {
    const [projects, setProjects] = useLocalStorage('crm_projects', [
        { id: '1', name: 'Website Redesign', client: 'Acme Corp', status: 'In Progress', progress: 75, limit: 'Dec 30', team: ['Alice', 'Bob'] },
        { id: '2', name: 'Mobile App Launch', client: 'Globex', status: 'At Risk', progress: 45, limit: 'Jan 15', team: ['Charlie'] },
        { id: '3', name: 'Marketing Campaign', client: 'Soylent', status: 'Completed', progress: 100, limit: 'Nov 20', team: ['Diana', 'Alice'] }
    ]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newProject, setNewProject] = useState({ name: '', client: '', status: 'In Progress' });

    const getStatusColor = (status) => {
        switch (status) {
            case 'Completed': return 'text-green-500 bg-green-100 dark:bg-green-900/30';
            case 'At Risk': return 'text-red-500 bg-red-100 dark:bg-red-900/30';
            default: return 'text-indigo-500 bg-indigo-100 dark:bg-indigo-900/30';
        }
    };

    const handleAdd = (e) => {
        e.preventDefault();
        setProjects([...projects, { ...newProject, id: uuidv4(), progress: 0, limit: 'TBD', team: [] }]);
        setIsModalOpen(false);
        setNewProject({ name: '', client: '', status: 'In Progress' });
    };

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-3xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
                        <Folder className="text-indigo-600" size={32} /> Projects
                    </h2>
                    <p className="text-gray-500">Manage your ongoing work and client deliverables</p>
                </div>
                <Button onClick={() => setIsModalOpen(true)} className="btn-primary">
                    <Plus size={20} /> New Project
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project) => (
                    <GlassCard key={project.id} className="group hover:border-indigo-500/50 relative">
                        <div className="flex justify-between items-start mb-4">
                            <div className={`p-3 rounded-xl ${getStatusColor(project.status)}`}>
                                <Folder size={24} />
                            </div>
                            <button className="text-gray-400 hover:text-indigo-500">
                                <MoreVertical size={20} />
                            </button>
                        </div>

                        <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-1">{project.name}</h3>
                        <p className="text-sm text-gray-500 mb-4">{project.client}</p>

                        <div className="space-y-2 mb-6">
                            <div className="flex justify-between text-sm font-semibold">
                                <span className="text-gray-600 dark:text-gray-300">Progress</span>
                                <span className="text-indigo-600">{project.progress}%</span>
                            </div>
                            <div className="h-2 w-full bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-1000"
                                    style={{ width: `${project.progress}%` }}
                                />
                            </div>
                        </div>

                        <div className="flex justify-between items-center pt-4 border-t border-gray-100 dark:border-gray-700">
                            <div className="flex -space-x-2">
                                {project.team.map((member, i) => (
                                    <div key={i} className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white dark:border-gray-800 flex items-center justify-center text-xs font-bold text-gray-600">
                                        {member.charAt(0)}
                                    </div>
                                ))}
                                <button className="w-8 h-8 rounded-full bg-gray-50 dark:bg-gray-700 border-2 border-white dark:border-gray-800 flex items-center justify-center text-xs font-bold text-gray-400 hover:text-indigo-500 hover:bg-white transition-colors">
                                    <Plus size={12} />
                                </button>
                            </div>
                            <div className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(project.status)}`}>
                                {project.status}
                            </div>
                        </div>
                    </GlassCard>
                ))}
            </div>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="New Project">
                <form onSubmit={handleAdd} className="space-y-4">
                    <Input label="Project Name" value={newProject.name} onChange={e => setNewProject({ ...newProject, name: e.target.value })} required />
                    <Input label="Client" value={newProject.client} onChange={e => setNewProject({ ...newProject, client: e.target.value })} required />
                    <div className="flex justify-end pt-4">
                        <Button type="button" onClick={() => setIsModalOpen(false)} className="bg-gray-200 text-gray-700 mr-2 rounded-xl px-4 py-2">Cancel</Button>
                        <Button type="submit" className="bg-indigo-600 text-white rounded-xl px-4 py-2">Create Project</Button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default Projects;
