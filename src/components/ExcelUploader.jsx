import { useState, useCallback } from 'react';
// import { useDropzone } from 'react-dropzone'; // Removed unused dependency
import { Upload, FileSpreadsheet, CheckCircle, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import * as XLSX from 'xlsx';

const ExcelUploader = ({ onUpload, template }) => {
    const [uploadStatus, setUploadStatus] = useState(null); // { type: 'success' | 'error', message: '' }
    const [isDragActive, setIsDragActive] = useState(false);

    const processFile = (file) => {
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (evt) => {
            try {
                const bstr = evt.target.result;
                const wb = XLSX.read(bstr, { type: 'binary' });
                const wsname = wb.SheetNames[0];
                const ws = wb.Sheets[wsname];
                const data = XLSX.utils.sheet_to_json(ws);

                if (data.length === 0) {
                    setUploadStatus({ type: 'error', message: 'File is empty' });
                    return;
                }

                // Pass parsed data to parent
                const result = onUpload(data);

                if (result.success) {
                    setUploadStatus({ type: 'success', message: result.message || `Successfully loaded ${data.length} records` });
                    // Clear status after 3 seconds
                    setTimeout(() => setUploadStatus(null), 3000);
                } else {
                    setUploadStatus({ type: 'error', message: result.message || 'Error processing data' });
                }

            } catch (err) {
                console.error(err);
                setUploadStatus({ type: 'error', message: 'Failed to parse Excel file. Ensure valid .xlsx/.csv format.' });
            }
        };
        reader.readAsBinaryString(file);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragActive(false);
        const file = e.dataTransfer.files[0];
        processFile(file);
    };

    const handleChange = (e) => {
        const file = e.target.files[0];
        processFile(file);
    };

    return (
        <div className="w-full">
            <div
                className={`relative border-2 border-dashed rounded-2xl p-6 transition-all text-center group cursor-pointer ${isDragActive
                    ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20'
                    : 'border-gray-300 dark:border-gray-700 hover:border-indigo-400 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                    }`}
                onDragOver={(e) => { e.preventDefault(); setIsDragActive(true); }}
                onDragLeave={() => setIsDragActive(false)}
                onDrop={handleDrop}
            >
                <input
                    type="file"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    accept=".xlsx, .xls, .csv"
                    onChange={handleChange}
                />

                <div className="flex flex-col items-center justify-center space-y-3 pointer-events-none">
                    <div className="p-3 bg-indigo-50 dark:bg-indigo-900/30 rounded-full group-hover:scale-110 transition-transform">
                        <FileSpreadsheet className="text-indigo-500 w-8 h-8" />
                    </div>
                    <div>
                        <p className="font-bold text-gray-700 dark:text-gray-200">
                            Click to upload or drag & drop Excel
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                            Expected columns: <code className="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded text-xs font-mono">{template}</code>
                        </p>
                    </div>
                </div>
            </div>

            <AnimatePresence>
                {uploadStatus && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className={`mt-4 p-3 rounded-xl flex items-center gap-3 text-sm font-bold ${uploadStatus.type === 'success'
                            ? 'bg-emerald-100/80 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300'
                            : 'bg-red-100/80 text-red-800 dark:bg-red-900/40 dark:text-red-300'
                            }`}
                    >
                        {uploadStatus.type === 'success' ? <CheckCircle size={18} /> : <AlertCircle size={18} />}
                        {uploadStatus.message}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ExcelUploader;
