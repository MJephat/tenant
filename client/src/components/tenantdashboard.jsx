// Dashboard.jsx
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";

const Card = ({ title, children }) => (
  <div className="bg-white rounded-2xl shadow p-4">
    {title && <h2 className="text-lg font-semibold mb-2">{title}</h2>}
    {children}
  </div>
);

const fetchTenants = async () => {
  const response = await axiosInstance.get("/tenant");
  return response.data.tenants; // Make sure the response structure matches
};

const fetchroom = async () => {
  const response = await axiosInstance.get(`/payment/monthlysummary/${search}`);
  return response.data.payment.tenantId; // Make sure the response structure matches
};
const TenantDashboard = ({ data}) => {
    const { roomNumber, rentAmount,balance,amountPaid,notes,electricityBill,paymentMonth} = data || {};
    const {  tenants, tenantId, error, isLoading } = useQuery({
    queryKey: ["tenants"],
    queryFn: fetchTenants,fetchroom
  });

    const [tenant, setTenant] = useState(null);


  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Welcome, {data?.name}!</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
        
        <Card title="Overview">
          <div className="text-sm text-gray-600">Current Rental Unit</div>
          <div className="font-medium">Plot 953,Dandora, Room {data?.roomNumber}</div>
          <div className="text-teal-600 text-sm">Lease Active</div>
          <div className="text-2xl font-bold mt-2">Ksh. {rentAmount}</div>
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
            
            <span className="font-semibold">Balance: Ksh. {balance}</span>
          </div>
          <div className="text-gray-600 text-sm mb-2">5th of  every month, {new Date().getFullYear()}</div>
          <button className="bg-teal-600 text-white px-4 py-2 rounded-md mb-2">Pay Now</button>
          <div className="text-sm text-gray-500">Payment History</div>

         {tenant && data.payments.tenantId.name.toLowerCase() === search.toLowerCase() && data.payments.tenantId._id && (
            <ul className="text-sm space-y-1">
                {data?.payments?.slice(-3).reverse().map((payment, index) => (
                <li key={index} className="flex justify-between">
                    <span>
                    {paymentMonth},{" "}
                    <span className="italic text-gray-600">{notes}</span>
                    </span>
                    <span className="font-medium">Ksh. {amountPaid.toLocaleString()}</span>
                </li>
                ))}
            </ul>
            )}
        </Card>

        <Card title="Lease Documents">
          <div className="text-sm font-medium">Property Manager</div>
          <div className="text-sm text-gray-500">
            <b>Reminder. Rent is due on Fifth of month.</b>
          </div>
        </Card>

        <Card title="Important Dates">
          <div className="text-sm">
            Lease Start: <span className="font-medium">May 18, 2025</span><br />
            Lease End: <span className="font-medium">ACTIVE</span>
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
