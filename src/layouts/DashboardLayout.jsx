import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import FabAction from '../components/FabAction';

const DashboardLayout = () => {
    return (
        <div className="flex min-h-screen bg-gray-100 dark:bg-slate-900 transition-colors duration-300">
            <Sidebar />
            <div className="flex-1 flex flex-col h-screen overflow-hidden">
                <Header />
                <main className="flex-1 overflow-y-auto p-6 scroll-smooth">
                    <Outlet />
                </main>
                <FabAction />
            </div>
        </div>
    );
};

export default DashboardLayout;
