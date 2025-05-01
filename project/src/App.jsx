import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import { EmployeeProvider } from './context/EmployeeContext';
import { TaskProvider } from './context/TaskContext';
import { NotificationProvider } from './context/NotificationContext';

import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import Employees from './pages/Employees';
import Tasks from './pages/Tasks';
import EmployeeDetail from './pages/EmployeeDetail';
import TaskDetail from './pages/TaskDetail';
import SignUp from './components/Auth/SignUp';
import Login from './components/Auth/Login';
import SuperAdmin from '../../server/models/superAdmin.model';

function App() {
  // Example: Use local state or context/auth-provider in real apps
  const [user, setUser] = useState(null); // Replace with actual auth logic

  return (
    <Router>
      <NotificationProvider>
        <EmployeeProvider>
          <TaskProvider>
            <Routes>
              {/* Public Routes */}
              {!user && (
                <>
                  <Route path="/login" element={<Login setUser={setUser} />} />
                  <Route path="/register" element={<SignUp />} />
                  <Route path="*" element={<Navigate to="/login" replace />} />
                </>
              )}

              {/* Protected Routes */}
              {user && (
                <Route element={<Layout />}>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/employees" element={<Employees />} />
                  <Route path="/employees/:id" element={<EmployeeDetail />} />
                  <Route path="/tasks" element={<Tasks />} />
                  <Route path="/tasks/:id" element={<TaskDetail />} />
                  <Route path='/superadmin' element = {<SuperAdmin/>} />
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Route>
              )}
            </Routes>
          </TaskProvider>
        </EmployeeProvider>
      </NotificationProvider>
    </Router>
  );
}

export default App;
