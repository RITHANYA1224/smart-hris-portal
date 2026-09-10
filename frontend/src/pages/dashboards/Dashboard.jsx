import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import AdminDashboard from './AdminDashboard';
import HRDashboard from './HRDashboard';
import ManagerDashboard from './ManagerDashboard';
import EmployeeDashboard from './EmployeeDashboard';
import UnifiedDashboard from '../../views/Dashboard';

const Dashboard = () => {
  const { authState } = useContext(AuthContext);
  const role = authState.role?.toUpperCase();

  // Return role-specialized dashboard or unified smart dashboard
  if (role === 'ADMIN') return <UnifiedDashboard />;
  if (role === 'HR_BP') return <HRDashboard />;
  if (role === 'MANAGER') return <ManagerDashboard />;
  if (role === 'EMPLOYEE') return <EmployeeDashboard />;

  return <UnifiedDashboard />;
};

export default Dashboard;
