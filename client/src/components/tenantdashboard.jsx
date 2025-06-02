// Dashboard.jsx
import React from "react";

const Card = ({ title, children }) => (
  <div className="bg-white rounded-2xl shadow p-4">
    {title && <h2 className="text-lg font-semibold mb-2">{title}</h2>}
    {children}
  </div>
);

const TenantDashboard = () => {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Welcome, John!</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
        
        <Card title="Overview">
          <div className="text-sm text-gray-600">Current Rental Unit</div>
          <div className="font-medium">Plot 953, Dandora, R1</div>
          <div className="text-teal-600 text-sm">Lease Active</div>
          <div className="text-2xl font-bold mt-2">Ksh. 3,000.00</div>
        </Card>

        <Card title="Maintenance Requests">
          <button className="bg-teal-600 text-white px-4 py-2 rounded-md mb-4">+ New Request</button>
          <div>
            <div className="text-sm font-medium">Leaking faucet</div>
            <div className="text-xs text-gray-500">Mar. 16, 2025</div>
            <div className="text-xs text-yellow-600 font-semibold">In Progress</div>
          </div>
        </Card>

        <Card title="Payments">
          <div className="flex justify-between text-sm">
            <span>Next Payment Due</span>
            
            <span className="font-semibold">Ksh. 3,000.00</span>
          </div>
          <div className="text-gray-600 text-sm mb-2">June 5, 2025</div>
          <button className="bg-teal-600 text-white px-4 py-2 rounded-md mb-2">Pay Now</button>
          <div className="text-sm text-gray-500">Payment History</div>
          <ul className="text-sm">
            <li className="flex justify-between">April 1, 2024 <span>Ksh. 3,000.00</span></li>
            <li className="flex justify-between">March 1, 2024 <span>Ksh. 3,000.00</span></li>
          </ul>
        </Card>

        <Card title="Lease Documents">
          <div className="text-sm font-medium">Property Manager</div>
          <div className="text-sm text-gray-500">
            Reminder. Rent is due on first of month.
          </div>
        </Card>

        <Card title="Important Dates">
          <div className="text-sm">
            Lease Start: <span className="font-medium">June 1, 2023</span><br />
            Lease End: <span className="font-medium">May 31, 2024</span>
          </div>
        </Card>

        <Card title="Profile & Settings">
          <ul className="text-sm space-y-1">
            <li><a href="#" className="text-teal-600">Edit Profile</a></li>
            <li><a href="#" className="text-teal-600">Change Password</a></li>
            <li><a href="#" className="text-teal-600">Notification Preferences</a></li>
          </ul>
        </Card>
      </div>
    </div>
  );
};

export default TenantDashboard;
