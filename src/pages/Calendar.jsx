import { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus, Calendar as CalendarIcon } from 'lucide-react';
import GlassCard from '../components/GlassCard';
import useLocalStorage from '../hooks/useLocalStorage';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, addMonths, subMonths } from 'date-fns';

const Calendar = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [tasks] = useLocalStorage('crm_tasks', []);

    // Calendar Generation Logic
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(currentDate);
    const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

    // Header Controls
    const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
    const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));

    return (
        <div className="space-y-6 h-full flex flex-col">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-3xl font-bold text-gray-800 dark:text-white flex items-center gap-3">
                        <CalendarIcon size={32} className="text-indigo-600" />
                        Project Calendar
                    </h2>
                    <p className="text-gray-500 dark:text-gray-400 text-lg">Manage deadlines and milestones</p>
                </div>
                <div className="flex items-center gap-4 bg-white dark:bg-gray-800 p-2 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                    <button onClick={prevMonth} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-gray-600 dark:text-gray-300">
                        <ChevronLeft size={24} />
                    </button>
                    <span className="text-xl font-bold min-w-[150px] text-center text-gray-800 dark:text-white">
                        {format(currentDate, 'MMMM yyyy')}
                    </span>
                    <button onClick={nextMonth} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-gray-600 dark:text-gray-300">
                        <ChevronRight size={24} />
                    </button>
                </div>
            </div>

            {/* Calendar Grid */}
            <GlassCard className="flex-1 overflow-hidden flex flex-col p-6">
                {/* Weekday Headers */}
                <div className="grid grid-cols-7 mb-4">
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                        <div key={day} className="text-center font-bold text-gray-400 uppercase text-sm tracking-wider py-2">
                            {day}
                        </div>
                    ))}
                </div>

                {/* Days Grid */}
                <div className="grid grid-cols-7 grid-rows-5 gap-2 flex-1">
                    {daysInMonth.map((day, idx) => {
                        const dayTasks = tasks.filter(t => t.dueDate && isSameDay(new Date(t.dueDate), day));

                        return (
                            <div
                                key={day.toString()}
                                className={`
                                    border border-gray-100 dark:border-gray-700 rounded-xl p-3 flex flex-col gap-2 transition-all hover:bg-indigo-50/50 dark:hover:bg-indigo-900/10
                                    ${!isSameMonth(day, currentDate) ? 'opacity-30' : ''}
                                    ${isSameDay(day, new Date()) ? 'bg-indigo-50/30 dark:bg-indigo-900/10 border-indigo-200' : 'bg-white/50 dark:bg-gray-800/40'}
                                `}
                            >
                                <span className={`text-lg font-bold ${isSameDay(day, new Date()) ? 'text-indigo-600' : 'text-gray-700 dark:text-gray-300'}`}>
                                    {format(day, 'd')}
                                </span>

                                <div className="space-y-1 overflow-y-auto max-h-[80px] custom-scrollbar">
                                    {dayTasks.map(task => (
                                        <div key={task.id} className="text-xs p-1.5 rounded-lg bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-700 truncate font-medium shadow-sm">
                                            {task.title}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </GlassCard>
        </div>
    );
};

export default Calendar;
