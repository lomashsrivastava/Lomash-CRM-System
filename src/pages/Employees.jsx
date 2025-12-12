import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Search, Edit2, Trash2, Mail, Phone, User, DollarSign, Briefcase } from 'lucide-react';
import useLocalStorage from '../hooks/useLocalStorage';
import Button from '../components/Button';
import Input from '../components/Input';
import Modal from '../components/Modal';
import GlassCard from '../components/GlassCard';
import ExcelUploader from '../components/ExcelUploader';
import { v4 as uuidv4 } from 'uuid';

const Employees = () => {
    const [employees, setEmployees] = useLocalStorage('crm_employees', []);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [editingEmployee, setEditingEmployee] = useState(null);

    const [formData, setFormData] = useState({
        name: '',
        role: '',
        department: '',
        email: '',
        phone: '',
        baseSalary: '',
        status: 'Active'
    });

    const handleOpenModal = (employee = null) => {
        if (employee) {
            setEditingEmployee(employee);
            setFormData(employee);
        } else {
            setEditingEmployee(null);
            setFormData({ name: '', role: '', department: '', email: '', phone: '', baseSalary: '', status: 'Active' });
        }
        setIsModalOpen(true);
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to remove this employee?')) {
            setEmployees(employees.filter(e => e.id !== id));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingEmployee) {
            setEmployees(employees.map(e => e.id === editingEmployee.id ? { ...formData, id: e.id } : e));
        } else {
            setEmployees([...employees, { ...formData, id: uuidv4(), joined: new Date().toISOString() }]);
        }
        setIsModalOpen(false);
    };

    const filteredEmployees = employees.filter(e =>
        e.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        e.role.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-end">
                <div>
                    <h2 className="text-4xl font-extrabold text-gradient pb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400">Team Directory</h2>
                    <p className="text-lg text-gray-500 dark:text-gray-400 font-medium">Manage your company staff and roles.</p>
                </div>
                <Button onClick={() => handleOpenModal()} className="bg-gradient-to-r from-blue-600 to-teal-500 text-white hover:from-blue-700 hover:to-teal-600 border-none shadow-lg shadow-blue-500/30">
                    <Plus size={18} className="mr-2 inline" /> Add Employee
                </Button>
            </div>

            <GlassCard>
                <div className="mb-6 flex gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search employees by name or role..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <AnimatePresence>
                        {/* Excel Uploader Card */}
                        <div className="bg-white/50 dark:bg-gray-800/40 border-2 border-dashed border-indigo-300 dark:border-indigo-700 rounded-2xl p-6 flex flex-col justify-center items-center hover:bg-indigo-50 dark:hover:bg-indigo-900/10 transition-colors">
                            <h3 className="font-bold text-gray-800 dark:text-white mb-4">Bulk Import Staff</h3>
                            <ExcelUploader
                                template="Name | Role | Salary | Status"
                                onUpload={(data) => {
                                    const newEmployees = data.map((row) => ({
                                        id: uuidv4(),
                                        name: row.Name || row.name || 'Unknown',
                                        role: row.Role || row.role || 'Staff',
                                        department: row.Department || row.department || 'General',
                                        email: row.Email || row.email || '',
                                        phone: row.Phone || row.phone || '',
                                        baseSalary: row.Salary || row.salary || row.BaseSalary || '0',
                                        status: (row.Status?.toLowerCase() === 'active') ? 'Active' : 'On Leave',
                                        joined: new Date().toISOString()
                                    })).filter(e => e.name !== 'Unknown');

                                    setEmployees([...employees, ...newEmployees]);
                                    return { success: true, message: `Added ${newEmployees.length} employees!` };
                                }}
                            />
                        </div>

                        {filteredEmployees.map((employee, index) => (
                            <motion.div
                                key={employee.id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-white/50 dark:bg-gray-800/40 border border-gray-100 dark:border-gray-700 rounded-2xl p-6 hover:shadow-xl transition-all hover:-translate-y-1 group relative overflow-hidden"
                            >
                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-teal-500 opacity-0 group-hover:opacity-100 transition-opacity" />

                                <div className="flex justify-between items-start mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-teal-500 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-blue-500/20">
                                            {employee.name.charAt(0)}
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-gray-800 dark:text-white text-lg">{employee.name}</h3>
                                            <p className="text-sm text-blue-500 font-medium">{employee.role}</p>
                                        </div>
                                    </div>
                                    <span className={`px-2 py-1 rounded-full text-xs font-bold ${employee.status === 'Active' ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-500'}`}>
                                        {employee.status}
                                    </span>
                                </div>

                                <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300 mb-4">
                                    <div className="flex items-center gap-2"><Briefcase size={14} className="text-gray-400" /> {employee.department}</div>
                                    <div className="flex items-center gap-2"><Mail size={14} className="text-gray-400" /> {employee.email}</div>
                                    <div className="flex items-center gap-2"><Phone size={14} className="text-gray-400" /> {employee.phone}</div>
                                    <div className="flex items-center gap-2"><DollarSign size={14} className="text-gray-400" /> ${Number(employee.baseSalary).toLocaleString()}/mo</div>
                                </div>

                                <div className="flex justify-end gap-2 pt-4 border-t border-gray-100 dark:border-gray-700">
                                    <button onClick={() => handleOpenModal(employee)} className="p-2 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg text-blue-500 transition-colors"><Edit2 size={18} /></button>
                                    <button onClick={() => handleDelete(employee.id)} className="p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg text-red-500 transition-colors"><Trash2 size={18} /></button>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
                {filteredEmployees.length === 0 && <p className="text-center text-gray-500 py-10">No employees found. Add your first team member!</p>}
            </GlassCard>

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={editingEmployee ? 'Edit Employee' : 'Add New Employee'}
            >
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <Input label="Full Name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
                        <Input label="Job Role" value={formData.role} onChange={(e) => setFormData({ ...formData, role: e.target.value })} placeholder="e.g. Senior Developer" required />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <Input label="Department" value={formData.department} onChange={(e) => setFormData({ ...formData, department: e.target.value })} placeholder="e.g. Engineering" required />
                        <Input label="Base Salary ($)" type="number" value={formData.baseSalary} onChange={(e) => setFormData({ ...formData, baseSalary: e.target.value })} placeholder="5000" required />
                    </div>

                    <Input label="Email" type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
                    <Input label="Phone" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />

                    <div className="mb-4">
                        <label className="block text-sm font-bold mb-1 ml-1 text-white drop-shadow-md tracking-wide">Status</label>
                        <select
                            value={formData.status}
                            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                            className="w-full px-4 py-3 rounded-lg bg-black/20 text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all appearance-none font-semibold cursor-pointer"
                        >
                            <option value="Active" className="bg-slate-800 text-white">Active</option>
                            <option value="On Leave" className="bg-slate-800 text-white">On Leave</option>
                            <option value="Terminated" className="bg-slate-800 text-white">Terminated</option>
                        </select>
                    </div>

                    <div className="flex justify-end pt-4">
                        <Button type="button" onClick={() => setIsModalOpen(false)} className="bg-white/10 text-white mr-2 hover:bg-white/20">Cancel</Button>
                        <Button type="submit" className="bg-blue-600 text-white hover:bg-blue-700">Save Employee</Button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default Employees;
