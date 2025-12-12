import { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { motion } from 'framer-motion';
import { Plus, DollarSign, Phone, Mail, MoreHorizontal } from 'lucide-react';
import useLocalStorage from '../hooks/useLocalStorage';
import Button from '../components/Button';
import Input from '../components/Input';
import Modal from '../components/Modal';
import ExcelUploader from '../components/ExcelUploader';
import { v4 as uuidv4 } from 'uuid';

const columns = {
    New: { id: 'New', title: 'New Leads', color: 'blue' },
    Contacted: { id: 'Contacted', title: 'Contacted', color: 'yellow' },
    Qualified: { id: 'Qualified', title: 'Qualified', color: 'purple' },
    Converted: { id: 'Converted', title: 'Converted', color: 'green' },
};

const Leads = () => {
    const [leads, setLeads] = useLocalStorage('crm_leads', [
        { id: '1', name: 'Acme Corp', status: 'New', value: '5000', email: 'info@acme.com' },
        { id: '2', name: 'Global Tech', status: 'Qualified', value: '12000', email: 'sales@global.com' },
    ]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({ name: '', email: '', value: '', status: 'New' });

    const onDragEnd = (result) => {
        if (!result.destination) return;

        const { source, destination, draggableId } = result;

        if (source.droppableId !== destination.droppableId) {
            const updatedLeads = leads.map(lead =>
                lead.id === draggableId ? { ...lead, status: destination.droppableId } : lead
            );
            setLeads(updatedLeads);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLeads([...leads, { ...formData, id: uuidv4() }]);
        setIsModalOpen(false);
        setFormData({ name: '', email: '', value: '', status: 'New' });
    };

    return (
        <div className="space-y-6 h-full flex flex-col">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Leads Pipeline</h2>
                    <p className="text-gray-500 dark:text-gray-400">Manage and track your sales opportunities</p>
                </div>
                <Button onClick={() => setIsModalOpen(true)} className="bg-indigo-600 text-white hover:bg-indigo-700">
                    <Plus size={18} className="mr-2 inline" /> Add Lead
                </Button>
            </div>

            <div className="bg-white/50 dark:bg-gray-800/40 border-2 border-dashed border-indigo-300 dark:border-indigo-700 rounded-2xl p-6 flex flex-col justify-center items-center mb-6">
                <h3 className="font-bold text-gray-800 dark:text-white mb-4">Bulk Import Leads</h3>
                <ExcelUploader
                    template="Name | Email | Value | Status"
                    onUpload={(data) => {
                        const newLeads = data.map(row => ({
                            id: uuidv4(),
                            name: row.Name || row.name || 'Unknown Lead',
                            status: ['New', 'Contacted', 'Qualified', 'Converted'].includes(row.Status) ? row.Status : 'New',
                            value: row.Value || row.value || '0',
                            email: row.Email || row.email || ''
                        }));
                        setLeads([...leads, ...newLeads]);
                        return { success: true, message: `Imported ${newLeads.length} leads` };
                    }}
                />
            </div>

            <div className="flex-1 overflow-x-auto overflow-y-hidden">
                <DragDropContext onDragEnd={onDragEnd}>
                    <div className="flex gap-6 h-full min-w-[1000px] pb-4">
                        {Object.values(columns).map(column => (
                            <div key={column.id} className="flex-1 min-w-[280px] flex flex-col h-full bg-gray-50/50 dark:bg-gray-900/30 rounded-xl border border-gray-200 dark:border-gray-700/50 backdrop-blur-sm">
                                <div className={`p-4 border-b border-${column.color}-200 dark:border-${column.color}-900/50 bg-${column.color}-50/50 dark:bg-${column.color}-900/20 rounded-t-xl flex justify-between items-center`}>
                                    <h3 className={`font-bold text-${column.color}-700 dark:text-${column.color}-400`}>{column.title}</h3>
                                    <span className={`bg-${column.color}-100 dark:bg-${column.color}-900/50 text-${column.color}-600 dark:text-${column.color}-300 px-2 py-0.5 rounded-full text-xs font-bold`}>
                                        {leads.filter(l => l.status === column.id).length}
                                    </span>
                                </div>

                                <Droppable droppableId={column.id}>
                                    {(provided, snapshot) => (
                                        <div
                                            {...provided.droppableProps}
                                            ref={provided.innerRef}
                                            className={`flex-1 p-3 overflow-y-auto space-y-3 transition-colors ${snapshot.isDraggingOver ? 'bg-indigo-50/50 dark:bg-indigo-900/10' : ''}`}
                                        >
                                            {leads.filter(lead => lead.status === column.id).map((lead, index) => (
                                                <Draggable key={lead.id} draggableId={lead.id} index={index}>
                                                    {(provided, snapshot) => (
                                                        <div
                                                            ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                            className={`
                                                        bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700
                                                        hover:shadow-md transition-shadow cursor-grab active:cursor-grabbing
                                                        ${snapshot.isDragging ? 'shadow-xl ring-2 ring-indigo-500/50 rotate-2' : ''}
                                                    `}
                                                            style={{ ...provided.draggableProps.style }}
                                                        >
                                                            <div className="flex justify-between items-start mb-2">
                                                                <h4 className="font-semibold text-gray-800 dark:text-gray-200">{lead.name}</h4>
                                                                <button className="text-gray-400 hover:text-gray-600"><MoreHorizontal size={16} /></button>
                                                            </div>
                                                            <div className="space-y-1 mb-3">
                                                                <div className="flex items-center text-xs text-gray-500 gap-1.5">
                                                                    <Mail size={12} /> {lead.email}
                                                                </div>
                                                            </div>
                                                            <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100 dark:border-gray-700">
                                                                <span className="flex items-center text-sm font-bold text-gray-700 dark:text-gray-300">
                                                                    <DollarSign size={14} className="text-green-500" /> {lead.value}
                                                                </span>
                                                                <div className="text-[10px] text-gray-400">2d ago</div>
                                                            </div>
                                                        </div>
                                                    )}
                                                </Draggable>
                                            ))}
                                            {provided.placeholder}
                                        </div>
                                    )}
                                </Droppable>
                            </div>
                        ))}
                    </div>
                </DragDropContext>
            </div>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add New Lead">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <Input label="Lead Name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
                    <Input label="Email" type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
                    <Input label="Estimated Value" type="number" value={formData.value} onChange={(e) => setFormData({ ...formData, value: e.target.value })} />
                    <div className="flex justify-end pt-4">
                        <Button type="button" onClick={() => setIsModalOpen(false)} className="bg-gray-200 text-gray-700 mr-2">Cancel</Button>
                        <Button type="submit" className="bg-indigo-600 text-white">Add Lead</Button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default Leads;
