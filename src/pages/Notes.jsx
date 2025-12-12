import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Pin, Trash2, X } from 'lucide-react';
import useLocalStorage from '../hooks/useLocalStorage';
import Button from '../components/Button';
import { v4 as uuidv4 } from 'uuid';

const Notes = () => {
    const [notes, setNotes] = useLocalStorage('crm_notes', [
        { id: '1', title: 'Meeting Ideas', content: 'Discuss quarterly targets.', color: 'bg-yellow-100', pinned: true },
        { id: '2', title: 'Client Feedback', content: 'John loved the new UI.', color: 'bg-blue-100', pinned: false }
    ]);
    const [isAdding, setIsAdding] = useState(false);
    const [newNote, setNewNote] = useState({ title: '', content: '', color: 'bg-yellow-100' });

    const colors = [
        'bg-white dark:bg-gray-800',
        'bg-yellow-100 dark:bg-yellow-900/30',
        'bg-green-100 dark:bg-green-900/30',
        'bg-blue-100 dark:bg-blue-900/30',
        'bg-red-100 dark:bg-red-900/30',
        'bg-purple-100 dark:bg-purple-900/30'
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
        setNotes([{ ...newNote, id: uuidv4(), pinned: false, date: new Date().toISOString() }, ...notes]);
        setIsAdding(false);
        setNewNote({ title: '', content: '', color: 'bg-yellow-100' });
    };

    const deleteNote = (id) => {
        setNotes(notes.filter(n => n.id !== id));
    };

    const togglePin = (id) => {
        setNotes(notes.map(n => n.id === id ? { ...n, pinned: !n.pinned } : n).sort((a, b) => (b.pinned === a.pinned ? 0 : b.pinned ? 1 : -1)));
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Notes</h2>
                    <p className="text-gray-500 dark:text-gray-400">Capture your ideas and memos</p>
                </div>
                <Button onClick={() => setIsAdding(!isAdding)} className="bg-indigo-600 text-white hover:bg-indigo-700">
                    {isAdding ? <X /> : <><Plus size={18} className="mr-2 inline" /> New Note</>}
                </Button>
            </div>

            <AnimatePresence>
                {isAdding && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-lg mb-8">
                            <form onSubmit={handleSubmit}>
                                <input
                                    type="text"
                                    placeholder="Title"
                                    required
                                    className="w-full text-lg font-bold mb-2 bg-transparent border-none focus:ring-0 placeholder-gray-400 dark:text-white"
                                    value={newNote.title}
                                    onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
                                />
                                <textarea
                                    placeholder="Take a note..."
                                    required
                                    className="w-full h-24 bg-transparent border-none focus:ring-0 resize-none placeholder-gray-400 dark:text-white"
                                    value={newNote.content}
                                    onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
                                />
                                <div className="flex justify-between items-center mt-4">
                                    <div className="flex gap-2">
                                        {colors.map(c => (
                                            <button
                                                key={c} type="button"
                                                className={`w-6 h-6 rounded-full border border-gray-200 ${c} ${newNote.color === c ? 'ring-2 ring-indigo-500' : ''}`}
                                                onClick={() => setNewNote({ ...newNote, color: c })}
                                            />
                                        ))}
                                    </div>
                                    <Button type="submit" className="bg-indigo-600 text-white">Save</Button>
                                </div>
                            </form>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
                <AnimatePresence>
                    {notes.map(note => (
                        <motion.div
                            key={note.id}
                            layout={{ duration: 0.2 }}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className={`break-inside-avoid-column p-6 rounded-2xl shadow-sm border border-black/5 dark:border-white/10 relative group ${note.color} ${note.color.includes('bg-white') || note.color.includes('bg-gray-800') ? 'dark:text-white' : 'text-gray-800'}`}
                        >
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="font-bold text-lg">{note.title}</h3>
                                <button onClick={() => togglePin(note.id)} className={`p-1 rounded-full hover:bg-black/10 transition ${note.pinned ? 'text-indigo-600 bg-indigo-100' : 'text-gray-400 opacity-0 group-hover:opacity-100'}`}>
                                    <Pin size={16} className={note.pinned ? 'fill-current' : ''} />
                                </button>
                            </div>
                            <p className="whitespace-pre-wrap text-sm opacity-80">{note.content}</p>
                            <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button onClick={() => deleteNote(note.id)} className="p-2 text-gray-500 hover:text-red-500 transition"><Trash2 size={16} /></button>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default Notes;
