import React, { useEffect, useState } from 'react';
import { AlertTriangle, Users, FileText, CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import Layout from '../components/common/Layout';
import { getRequests, getTechnicianLoad } from "../api/requestApi";
import { getCriticalEquipment } from "../api/equipement";


const Dashboard = () => {
    const [requestStats, setRequestStats] = useState({
        pending: 0,
        inProgress: 0,
        completed: 0
    });
    const [criticalEquipmentCount, setCriticalEquipmentCount] = useState(0);
    const [technicianLoad, setTechnicianLoad] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [requestsRes, criticalRes, techLoadRes] = await Promise.all([
                    getRequests(),
                    getCriticalEquipment(),
                    getTechnicianLoad()
                ]);

                // Requests Stats
                const requests = requestsRes.data;
                const stats = {
                    pending: requests.filter(r => r.status === "New").length,
                    inProgress: requests.filter(r => r.status === "In Progress").length,
                    completed: requests.filter(r => r.status === "Repaired").length
                };
                setRequestStats(stats);

                // Critical Equipment Count
                setCriticalEquipmentCount(criticalRes.data.length);

                // Avg Technician Load
                const technicians = techLoadRes.data;
                const avgLoad = technicians.length > 0
                    ? technicians.reduce((acc, curr) => acc + curr.utilization, 0) / technicians.length
                    : 0;
                setTechnicianLoad(Math.round(avgLoad));

            } catch (error) {
                console.error("Failed to load dashboard data", error);
            }
        };

        fetchData();
    }, []);

    return (
        <Layout>
            <div className="bg-slate-900 text-red min-h-[300px]">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-white mb-2">Dashboard Overview</h1>
                    <p className="text-slate-400">Real-time insights into your fleet and workforce.</p>
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

                    {/* Card 1: Critical Equipment */}
                    <div className="bg-slate-800/50 backdrop-blur-md border border-red-500/30 rounded-2xl p-6 relative overflow-hidden group hover:border-red-500/50 transition-colors">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <AlertTriangle className="w-24 h-24 text-red-500" />
                        </div>
                        <div className="relative z-10">
                            <div className="flex items-center space-x-3 mb-4">
                                <div className="p-3 bg-red-500/20 rounded-xl">
                                    <AlertTriangle className="w-6 h-6 text-red-400" />
                                </div>
                                <h3 className="text-lg font-semibold text-slate-200">Critical Equipment</h3>
                            </div>
                            <div className="flex items-baseline space-x-2">
                                <span className="text-4xl font-bold text-white">{criticalEquipmentCount}</span>
                                <span className="text-sm text-red-400">At Risk</span>
                            </div>
                            <p className="text-sm text-slate-400 mt-2">
                                Machines requiring immediate attention or overhaul.
                            </p>
                        </div>
                    </div>

                    {/* Card 2: Technician Load */}
                    <div className="bg-slate-800/50 backdrop-blur-md border border-slate-700/50 rounded-2xl p-6 relative overflow-hidden group hover:border-blue-500/50 transition-colors">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <Users className="w-24 h-24 text-blue-500" />
                        </div>
                        <div className="relative z-10">
                            <div className="flex items-center space-x-3 mb-4">
                                <div className="p-3 bg-blue-500/20 rounded-xl">
                                    <Users className="w-6 h-6 text-blue-400" />
                                </div>
                                <h3 className="text-lg font-semibold text-slate-200">Technician Load</h3>
                            </div>
                            <div className="flex items-baseline space-x-2 mb-2">
                                <span className="text-4xl font-bold text-white">{technicianLoad}%</span>
                                <span className="text-sm text-blue-400">Utilization</span>
                            </div>

                            {/* Progress Bar */}
                            <div className="w-full bg-slate-700/50 rounded-full h-2 mb-2">
                                <div
                                    className="bg-blue-500 h-2 rounded-full transition-all duration-1000 ease-out"
                                    style={{ width: `${technicianLoad}%` }}
                                ></div>
                            </div>
                            <p className="text-sm text-slate-400">
                                Current workforce efficiency and deployment status.
                            </p>
                        </div>
                    </div>

                    {/* Card 3: Open Requests */}
                    <div className="bg-slate-800/50 backdrop-blur-md border border-slate-700/50 rounded-2xl p-6 relative overflow-hidden group hover:border-purple-500/50 transition-colors">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <FileText className="w-24 h-24 text-purple-500" />
                        </div>
                        <div className="relative z-10">
                            <div className="flex items-center space-x-3 mb-4">
                                <div className="p-3 bg-purple-500/20 rounded-xl">
                                    <FileText className="w-6 h-6 text-purple-400" />
                                </div>
                                <h3 className="text-lg font-semibold text-slate-200">Open Requests</h3>
                            </div>

                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center text-sm text-slate-300">
                                        <AlertCircle className="w-4 h-4 mr-2 text-yellow-400" /> Pending
                                    </div>
                                    <span className="font-bold text-white">{requestStats.pending}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center text-sm text-slate-300">
                                        <Clock className="w-4 h-4 mr-2 text-blue-400" /> In Progress
                                    </div>
                                    <span className="font-bold text-white">{requestStats.inProgress}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center text-sm text-slate-300">
                                        <CheckCircle2 className="w-4 h-4 mr-2 text-green-400" /> Completed
                                    </div>
                                    <span className="font-bold text-white">{requestStats.completed}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Table Placeholder */}
                <div className="w-full min-h-[400px] bg-slate-800/30 border-2 border-dashed border-slate-700/50 rounded-3xl flex items-center justify-center p-8 text-center group hover:border-slate-600/50 transition-colors">
                    <div className="max-w-md">
                        <div className="w-16 h-16 bg-slate-800 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                            <FileText className="w-8 h-8 text-slate-500" />
                        </div>
                        <h3 className="text-xl font-semibold text-slate-300 mb-2">Data Table Section</h3>
                        <p className="text-slate-500">
                            This space is reserved for detailed records, logs, or additional data tables connected to the cards above.
                        </p>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Dashboard;
