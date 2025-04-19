import React, { useState } from 'react'
import './App.css'
import Dashboard from './page/Dashboard';
import Sidebar from './components/sidebar';
import Header from './components/header';
import { Route, Routes } from 'react-router-dom';
import DataTable from './components/Table/tenantnames';
import ReportCharts from './components/Chart';
import MapView from './components/map';
import Invoice from './page/invoice';
import RegisterForm from './form/register';
import LoginForm from './form/login';
import { Toaster } from 'react-hot-toast';

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
            <Route path= "/" element={<Dashboard />} />           
             <Route path= "/tables" element={<DataTable />} />
             <Route path='/charts' element={<ReportCharts />} />
             <Route path='/maps' element={<MapView />} />
             <Route path='/invoice' element={<Invoice />} />
             <Route path='/register' element={<RegisterForm />} />
             <Route path='/login' element={<LoginForm />} />
          </Routes>
          <Toaster />
        </main>
      </div>
    </div>
  );
};

export default App;

