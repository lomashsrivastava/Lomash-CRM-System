import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Calendar as CalendarIcon, Upload, CheckCircle, XCircle, FileSpreadsheet, Save } from 'lucide-react';
import useLocalStorage from '../hooks/useLocalStorage';
import GlassCard from '../components/GlassCard';
import * as XLSX from 'xlsx';

const Attendance = () => {
    const [attendance, setAttendance] = useLocalStorage('crm_attendance', {}); // Format: { "YYYY-MM-DD": { employeeId: "Present" } }
    const [employees] = useLocalStorage('crm_employees', []);
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
    const [uploadStatus, setUploadStatus] = useState('');

    const handleFileUpload = useCallback((e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (evt) => {
            try {
                const bstr = evt.target.result;
                const wb = XLSX.read(bstr, { type: 'binary' });
                const wsname = wb.SheetNames[0];
                const ws = wb.Sheets[wsname];
                const data = XLSX.utils.sheet_to_json(ws);

                // Expected Excel Columns: Name, Date (e.g. "Sat Dec 13 2025"), Status ("Active")
                const newAttendance = { ...attendance };
                let count = 0;

                data.forEach(row => {
                    // 1. Employee Matching (Fuzzy: Trim + Lowercase)
                    const emp = employees.find(e => e.name.trim().toLowerCase() === row.Name?.trim().toLowerCase());

                    if (emp && row.Date && row.Status) {
                        // 2. Date Parsing ("Sat Dec 13 2025" -> "2025-12-13")
                        const dateObj = new Date(row.Date);
                        if (!isNaN(dateObj)) {
                            const isoDate = dateObj.toISOString().split('T')[0];

                            // 3. Status Mapping ("Active" -> "Present")
                            if (!newAttendance[isoDate]) newAttendance[isoDate] = {};

                            const statusLower = row.Status.toLowerCase();
                            const finalStatus = (statusLower === 'active' || statusLower === 'present') ? 'Present' : 'Absent';

                            newAttendance[isoDate][emp.id] = finalStatus;
                            count++;
                        }
                    }
                });

                setAttendance(newAttendance);
                setUploadStatus(`Success! Updated ${count} records.`);
            } catch (err) {
                console.error(err);
                setUploadStatus('Error: Could not parse Excel file.');
            }
        };
        reader.readAsBinaryString(file);
    }, [attendance, employees, setAttendance]);

    const toggleStatus = (employeeId) => {
        const current = attendance[selectedDate]?.[employeeId] || 'Absent';
        const newStatus = current === 'Present' ? 'Absent' : 'Present';

        setAttendance({
            ...attendance,
            [selectedDate]: {
                ...attendance[selectedDate],
                [employeeId]: newStatus
            }
        });
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-end">
                <div>
                    <h2 className="text-4xl font-extrabold text-gradient bg-clip-text text-transparent bg-gradient-to-r from-emerald-500 to-cyan-500">Smart Attendance</h2>
                    <p className="text-lg text-gray-500 dark:text-gray-400 font-medium">Track daily presence or upload bulk data.</p>
                </div>
                <div className="flex items-center gap-4">
                    <input
                        type="date"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="px-4 py-2 rounded-xl bg-white/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Daily Tracker */}
                <GlassCard className="lg:col-span-2">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
                            <CalendarIcon className="text-emerald-500" /> {new Date(selectedDate).toDateString()}
                        </h3>
                        <span className="text-sm font-semibold text-gray-500">
                            Present: {Object.values(attendance[selectedDate] || {}).filter(s => s === 'Present').length} / {employees.length}
                        </span>
                    </div>

                    <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
                        {employees.map(emp => {
                            const status = attendance[selectedDate]?.[emp.id] || 'Absent';
                            return (
                                <motion.div
                                    key={emp.id}
                                    layout
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className={`flex items-center justify-between p-4 rounded-xl border transition-all ${status === 'Present'
                                        ? 'bg-emerald-50/50 border-emerald-200 dark:bg-emerald-900/20 dark:border-emerald-800'
                                        : 'bg-red-50/50 border-red-200 dark:bg-red-900/10 dark:border-red-800'
                                        }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center font-bold text-gray-600 dark:text-gray-300">
                                            {emp.name.charAt(0)}
                                        </div>
                                        <div>
                                            <p className="font-bold text-gray-800 dark:text-white">{emp.name}</p>
                                            <p className="text-xs text-gray-500">{emp.role}</p>
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => toggleStatus(emp.id)}
                                        className={`px-4 py-2 rounded-lg font-bold text-sm flex items-center gap-2 transition-all ${status === 'Present'
                                            ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30 hover:bg-emerald-600'
                                            : 'bg-white dark:bg-gray-800 text-gray-400 hover:text-red-500 border border-transparent hover:border-red-200'
                                            }`}
                                    >
                                        {status === 'Present' ? <><CheckCircle size={16} /> Present</> : <><XCircle size={16} /> Absent</>}
                                    </button>
                                </motion.div>
                            );
                        })}
                        {employees.length === 0 && <p className="text-center text-gray-400 py-8">No employees found. Add them in the Employees tab first.</p>}
                    </div>
                </GlassCard>

                {/* Excel Upload Zone */}
                <GlassCard className="bg-gradient-to-b from-emerald-50/50 to-transparent border-emerald-100 dark:border-emerald-900/30">
                    <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-white flex items-center gap-2">
                        <FileSpreadsheet className="text-green-600" /> Excel Auto-Upload
                    </h3>
                    <p className="text-sm text-gray-500 mb-6">
                        Drag & Drop or select an Excel file to bulk update attendance.
                        format: <span className="font-mono bg-gray-100 dark:bg-gray-800 px-1 rounded">Name | Date | Status</span>
                    </p>

                    <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-emerald-300 dark:border-emerald-700 rounded-2xl cursor-pointer hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-colors group">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <Upload className="w-12 h-12 text-emerald-400 group-hover:scale-110 transition-transform mb-3" />
                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">.XLSX or .CSV files</p>
                        </div>
                        <input type="file" className="hidden" accept=".xlsx, .xls, .csv" onChange={handleFileUpload} />
                    </label>

                    {uploadStatus && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`mt-4 p-3 rounded-xl text-center text-sm font-bold ${uploadStatus.includes('Error') ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-700'}`}
                        >
                            {uploadStatus}
                        </motion.div>
                    )}
                </GlassCard>
            </div>
        </div>
    );
};

export default Attendance;
