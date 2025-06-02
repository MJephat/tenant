import React, { useState } from 'react'
import './App.css'
import Dashboard from './page/Dashboard';
import Sidebar from './components/sidebar';
import Header from './components/header';
import { Navigate, Route, Routes } from 'react-router-dom';
import DataTable from './components/Table/tenantnames';
import ReportCharts from './components/Chart';
import MapView from './components/map';
import Invoice from './page/invoice';
import RegisterForm from './form/register';
import LoginForm from './form/login';
import  { Toaster } from 'react-hot-toast';
import ProtectedRoute from './assets/protectedRoute.jsx';
import Home from './page/home.jsx';
import HouseCardGrid from './components/history.jsx';
import TenantDashboard from './components/tenantdashboard.jsx';

const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="flex-1 flex flex-col">
        <Header toggleSidebar={toggleSidebar} />
        <main className="p-4 overflow-y-auto">
          <Routes>
            <Route path= "/dashboard" element={<ProtectedRoute> <Dashboard /></ProtectedRoute>} />           
             <Route path= "/tables" element={<ProtectedRoute> <DataTable /></ProtectedRoute>} />           
             <Route path='/charts' element={<ProtectedRoute><ReportCharts /></ProtectedRoute> } />
             <Route path='/maps' element={<ProtectedRoute><MapView /></ProtectedRoute>} />
             <Route path='/invoice' element={<ProtectedRoute><Invoice /></ProtectedRoute> }/>
              <Route path='/statistics' element={<ProtectedRoute><HouseCardGrid /></ProtectedRoute>} />
              <Route path='/tenantDashboard' element={<ProtectedRoute><TenantDashboard /></ProtectedRoute>} />
             <Route path='/login' element={ <LoginForm />} />
             <Route path='/register' element={<RegisterForm />} />
             <Route path="/" element={<Home />} />
          </Routes>
          <Toaster />
        </main>
      </div>
    </div>
  );
};

export default App;


