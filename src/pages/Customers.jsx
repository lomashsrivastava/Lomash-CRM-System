import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Search, Edit2, Trash2, Mail, Phone, MoreHorizontal } from 'lucide-react';
import useLocalStorage from '../hooks/useLocalStorage';
import Button from '../components/Button';
import Input from '../components/Input';
import Modal from '../components/Modal';
import GlassCard from '../components/GlassCard';
import ExcelUploader from '../components/ExcelUploader';
import { v4 as uuidv4 } from 'uuid';

const Customers = () => {
    const [customers, setCustomers] = useLocalStorage('crm_customers', []);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [editingCustomer, setEditingCustomer] = useState(null);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        status: 'Active'
    });

    const handleOpenModal = (customer = null) => {
        if (customer) {
            setEditingCustomer(customer);
            setFormData(customer);
        } else {
            setEditingCustomer(null);
            setFormData({ name: '', email: '', phone: '', status: 'Active' });
        }
        setIsModalOpen(true);
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this customer?')) {
            setCustomers(customers.filter(c => c.id !== id));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingCustomer) {
            setCustomers(customers.map(c => c.id === editingCustomer.id ? { ...formData, id: c.id } : c));
        } else {
            setCustomers([...customers, { ...formData, id: uuidv4(), joined: new Date().toISOString() }]);
        }
        setIsModalOpen(false);
    };

    const filteredCustomers = customers.filter(c =>
        c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Customers</h2>
                    <p className="text-gray-500 dark:text-gray-400">Manage your customer relationships</p>
                </div>
                <Button onClick={() => handleOpenModal()} className="bg-indigo-600 text-white hover:bg-indigo-700">
                    <Plus size={18} className="mr-2 inline" /> Add Customer
                </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                <div className="hidden lg:block lg:col-span-1">
                    <GlassCard>
                        <h3 className="font-bold text-gray-800 dark:text-white mb-4">Bulk Import</h3>
                        <ExcelUploader
                            template="Name | Email | Phone | Status"
                            onUpload={(data) => {
                                const newCustomers = data.map(row => ({
                                    id: uuidv4(),
                                    name: row.Name || row.name || 'Unknown',
                                    email: row.Email || row.email || 'no-email@example.com',
                                    phone: row.Phone || row.phone || '',
                                    status: row.Status || 'Active',
                                    joined: new Date().toISOString()
                                }));
                                setCustomers([...customers, ...newCustomers]);
                                return { success: true, message: `Added ${newCustomers.length} customers` };
                            }}
                        />
                    </GlassCard>
                </div>
                <div className="lg:col-span-3">
                    <GlassCard>
                        <div className="mb-6 flex gap-4">
                            <div className="relative flex-1">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                <input
                                    type="text"
                                    placeholder="Search customers..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                                />
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 text-sm">
                                        <th className="p-4 font-medium">Name</th>
                                        <th className="p-4 font-medium">Contact</th>
                                        <th className="p-4 font-medium">Status</th>
                                        <th className="p-4 font-medium">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <AnimatePresence>
                                        {filteredCustomers.length === 0 ? (
                                            <tr><td colSpan="4" className="p-8 text-center text-gray-500">No customers found.</td></tr>
                                        ) : (
                                            filteredCustomers.map((customer) => (
                                                <motion.tr
                                                    key={customer.id}
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    exit={{ opacity: 0 }}
                                                    className="group hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-colors border-b border-gray-100 dark:border-gray-800 last:border-0"
                                                >
                                                    <td className="p-4">
                                                        <div className="flex items-center gap-3">
                                                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold">
                                                                {customer.name.charAt(0)}
                                                            </div>
                                                            <div>
                                                                <div className="font-semibold text-gray-800 dark:text-white">{customer.name}</div>
                                                                <div className="text-xs text-gray-400">ID: {customer.id.slice(0, 8)}</div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="p-4">
                                                        <div className="flex flex-col gap-1 text-sm text-gray-600 dark:text-gray-300">
                                                            <div className="flex items-center gap-2"><Mail size={14} /> {customer.email}</div>
                                                            {customer.phone && <div className="flex items-center gap-2"><Phone size={14} /> {customer.phone}</div>}
                                                        </div>
                                                    </td>
                                                    <td className="p-4">
                                                        <span className={`px-2 py-1 rounded-full text-xs font-medium 
                                      ${customer.status === 'Active' ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400' :
                                                                customer.status === 'Inactive' ? 'bg-gray-100 text-gray-600 dark:bg-gray-700/50 dark:text-gray-400' :
                                                                    'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400'}`}>
                                                            {customer.status}
                                                        </span>
                                                    </td>
                                                    <td className="p-4">
                                                        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                            <button onClick={() => handleOpenModal(customer)} className="p-1 hover:text-indigo-500 text-gray-400"><Edit2 size={18} /></button>
                                                            <button onClick={() => handleDelete(customer.id)} className="p-1 hover:text-red-500 text-gray-400"><Trash2 size={18} /></button>
                                                        </div>
                                                    </td>
                                                </motion.tr>
                                            ))
                                        )}
                                    </AnimatePresence>
                                </tbody>
                            </table>
                        </div>
                    </GlassCard>

                    <Modal
                        isOpen={isModalOpen}
                        onClose={() => setIsModalOpen(false)}
                        title={editingCustomer ? 'Edit Customer' : 'Add New Customer'}
                    >
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <Input
                                label="Full Name"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                required
                            />
                            <Input
                                label="Email Address"
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                required
                            />
                            <Input
                                label="Phone Number"
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            />

                            <div className="mb-4">
                                <label className="block text-sm font-bold mb-1 ml-1 text-white drop-shadow-md tracking-wide">Status</label>
                                <div className="relative">
                                    <select
                                        value={formData.status}
                                        onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                        className="w-full px-4 py-3 rounded-lg bg-black/20 text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all appearance-none font-semibold cursor-pointer"
                                    >
                                        <option value="Active" className="bg-slate-800 text-white">Active</option>
                                        <option value="Inactive" className="bg-slate-800 text-white">Inactive</option>
                                        <option value="Lead" className="bg-slate-800 text-white">Lead</option>
                                    </select>
                                </div>
                            </div>

                            <div className="flex justify-end pt-4">
                                <Button type="button" onClick={() => setIsModalOpen(false)} className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 mr-2 hover:bg-gray-300">Cancel</Button>
                                <Button type="submit" className="bg-indigo-600 text-white hover:bg-indigo-700">Save Customer</Button>
                            </div>
                        </form>
                    </Modal>
                </div>
            </div>
        </div>
    );
};

export default Customers;
