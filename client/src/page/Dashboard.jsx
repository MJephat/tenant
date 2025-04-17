import React, { useState } from 'react';
import OverviewCards from '../components/statCard';
import ReportCharts from '../components/Chart';
import MapView from '../components/map';

const Dashboard = () => {


  return (
    <div className="flex h-screen overflow-hidden">
      <div className="flex-1 flex flex-col">
        <main className="p-4 overflow-y-auto ">
          <OverviewCards/>
          <ReportCharts />
          <MapView />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
