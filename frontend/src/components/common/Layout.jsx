import React, { useState } from 'react'; // Added useState
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, AlertTriangle, FileText, Settings, LogOut, Menu, ChevronDown } from 'lucide-react';

const Layout = ({ children }) => {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isEquipmentOpen, setIsEquipmentOpen] = useState(false);

  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: AlertTriangle, label: 'Critical Equipment', path: '/critical-equipment' },
    { icon: Users, label: 'Technicians', path: '/technicians' },
    { icon: FileText, label: 'Requests', path: '/requests' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];

  const topNavItems = [
    { label: 'Maintenance', path: '/maintenance' },
    { label: 'Maintenance Calendar', path: '/maintenance-calendar' },
    // Equipment is handled separately for dropdown
    { label: 'Reporting', path: '/reporting' },
    { label: 'Teams', path: '/teams' },
  ];

  return (
    <div className="flex h-screen bg-slate-900 text-slate-100 overflow-hidden">
      {/* Sidebar */}
      <aside 
        className={`${
          isSidebarOpen ? 'w-64' : 'w-20'
        } bg-slate-800/50 backdrop-blur-xl border-r border-slate-700/50 transition-all duration-300 flex flex-col z-20`}
      >
        <div className="p-4 flex items-center justify-between border-b border-slate-700/50">
          <div className={`flex items-center space-x-3 ${!isSidebarOpen && 'justify-center w-full'}`}>
             <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex-shrink-0"></div>
             {isSidebarOpen && <span className="font-bold text-xl tracking-tight">Gear<span className="text-blue-400">Guard</span></span>}
          </div>
        </div>

        <nav className="flex-1 py-6 px-3 space-y-1">
          {navItems.map((item) => {
             const isActive = location.pathname === item.path;
             return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center px-3 py-3 rounded-xl transition-all group ${
                  isActive 
                    ? 'bg-blue-600/10 text-blue-400' 
                    : 'text-slate-400 hover:bg-slate-700/50 hover:text-slate-200'
                }`}
              >
                <item.icon className="w-5 h-5 flex-shrink-0" />
                {isSidebarOpen && (
                  <span className="ml-3 font-medium truncate">{item.label}</span>
                )}
                
                {/* Active Indicator */}
                {isActive && (
                    <div className="absolute left-0 w-1 h-8 bg-blue-500 rounded-r-full" />
                )}
              </Link>
            )
          })}
        </nav>

        <div className="p-4 border-t border-slate-700/50">
          <button className={`flex items-center w-full px-3 py-3 rounded-xl text-slate-400 hover:bg-red-500/10 hover:text-red-400 transition-all ${!isSidebarOpen && 'justify-center'}`}>
            <LogOut className="w-5 h-5 flex-shrink-0" />
            {isSidebarOpen && <span className="ml-3 font-medium">Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
         {/* Top Header */}
         <header className="h-16 bg-slate-800/30 border-b border-slate-700/50 flex items-center px-4 justify-between">
            <div className="flex items-center">
                <button 
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    className="p-2 rounded-lg hover:bg-slate-700/50 text-slate-400 transition-colors mr-4"
                >
                    <Menu className="w-5 h-5" />
                </button>

                {/* Top Navigation Links */}
                <nav className="hidden md:flex items-center space-x-1">
                    {/* Maintenance Tab */}
                    <Link to="/maintenance" className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${location.pathname === '/maintenance' ? 'bg-slate-700 text-white' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/30'}`}>
                        Maintenance
                    </Link>
                    
                    {/* Maintenance Calendar Tab */}
                    <Link to="/maintenance-calendar" className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${location.pathname === '/maintenance-calendar' ? 'bg-slate-700 text-white' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/30'}`}>
                        Maintenance Calendar
                    </Link>

                    {/* Equipment Dropdown */}
                    <div className="relative">
                        <button 
                            onClick={() => setIsEquipmentOpen(!isEquipmentOpen)}
                            className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${['/work-center', '/machine-tools'].includes(location.pathname) ? 'bg-slate-700 text-white' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/30'}`}
                        >
                            Equipment <ChevronDown className="w-4 h-4 ml-1" />
                        </button>
                        
                        {isEquipmentOpen && (
                            <div className="absolute top-full left-0 mt-1 w-48 bg-slate-800 border border-slate-700 rounded-xl shadow-xl py-1 z-50">
                                <Link to="/work-center" className="block px-4 py-2 text-sm text-slate-300 hover:bg-slate-700 hover:text-white" onClick={() => setIsEquipmentOpen(false)}>
                                    Work Center
                                </Link>
                                <Link to="/machine-tools" className="block px-4 py-2 text-sm text-slate-300 hover:bg-slate-700 hover:text-white" onClick={() => setIsEquipmentOpen(false)}>
                                    Machine and Tools
                                </Link>
                            </div>
                        )}
                        {/* Click outside listener could be added here for production robustness */}
                    </div>

                    {/* Reporting Tab */}
                    <Link to="/reporting" className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${location.pathname === '/reporting' ? 'bg-slate-700 text-white' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/30'}`}>
                        Reporting
                    </Link>

                    {/* Teams Tab */}
                    <Link to="/teams" className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${location.pathname === '/teams' ? 'bg-slate-700 text-white' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/30'}`}>
                        Teams
                    </Link>
                </nav>
            </div>

            <div className="flex items-center space-x-4">
                <div className="w-8 h-8 rounded-full bg-slate-700 border border-slate-600"></div>
            </div>
         </header>

         {/* Content Scroll Area */}
         <div className="flex-1 overflow-auto p-6 md:p-8 relative" onClick={() => setIsEquipmentOpen(false)}>
            {/* Background Gradients */}
            <div className="absolute top-0 left-0 w-full h-96 bg-blue-600/5 rounded-full blur-[120px] pointer-events-none"></div>
             <div className="absolute bottom-0 right-0 w-full h-96 bg-purple-600/5 rounded-full blur-[120px] pointer-events-none"></div>
            
            <div className="relative z-10 max-w-7xl mx-auto">
                {children}
            </div>
         </div>
      </main>
    </div>
  );
};

export default Layout;
