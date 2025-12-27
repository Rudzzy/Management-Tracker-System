import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import CriticalEquipment from './pages/CriticalEquipment';
import TechnicianLoad from './pages/TechnicianLoad';
import Requests from './pages/Requests';
import Maintenance from './pages/Maintenance';
import MaintenanceCalendar from './pages/MaintenanceCalendar';
import WorkCenter from './pages/WorkCenter';
import MachineTools from './pages/MachineTools';
import Reporting from './pages/Reporting';
import Teams from './pages/Teams';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        
        {/* Sidebar Routes */}
        <Route path="/critical-equipment" element={<CriticalEquipment />} />
        <Route path="/technicians" element={<TechnicianLoad />} />
        <Route path="/requests" element={<Requests />} />
        
        {/* Top Nav Routes */}
        <Route path="/maintenance" element={<Maintenance />} />
        <Route path="/maintenance-calendar" element={<MaintenanceCalendar />} />
        <Route path="/work-center" element={<WorkCenter />} />
        <Route path="/machine-tools" element={<MachineTools />} />
        <Route path="/reporting" element={<Reporting />} />
        <Route path="/teams" element={<Teams />} />

        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
