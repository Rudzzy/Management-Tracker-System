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
import ProtectedRoute from './components/auth/ProtectedRoute.jsx';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Protected Routes */}
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />

          {/* Sidebar Routes */}
          <Route path="/critical-equipment" element={<ProtectedRoute><CriticalEquipment /></ProtectedRoute>} />
          <Route path="/technicians" element={<ProtectedRoute><TechnicianLoad /></ProtectedRoute>} />
          <Route path="/requests" element={<ProtectedRoute><Requests /></ProtectedRoute>} />

          {/* Top Nav Routes */}
          <Route path="/maintenance" element={<ProtectedRoute><Maintenance /></ProtectedRoute>} />
          <Route path="/maintenance-calendar" element={<ProtectedRoute><MaintenanceCalendar /></ProtectedRoute>} />
          <Route path="/work-center" element={<ProtectedRoute><WorkCenter /></ProtectedRoute>} />
          <Route path="/machine-tools" element={<ProtectedRoute><MachineTools /></ProtectedRoute>} />
          <Route path="/reporting" element={<ProtectedRoute><Reporting /></ProtectedRoute>} />
          <Route path="/teams" element={<ProtectedRoute><Teams /></ProtectedRoute>} />

          {/* Default Redirect */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />

          {/* Catch all - 404 can go here or redirect to dashboard */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
