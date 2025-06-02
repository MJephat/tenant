import React, { useState } from "react";
import { axiosInstance } from "../assets/axios";
import { Loader } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";


// Fetch tenants from backend
const fetchTenants = async () => {
  const response = await axiosInstance.get("/tenant");
  return response.data.tenants; // Make sure the response structure matches
};

// Fetch payment summary
const fetchSummary = async ({ queryKey }) => {
    const [_key, tenantId] = queryKey;
    const response = await axiosInstance.get(`/payment/monthlysummary/${tenantId}`);
    return response.data.payments;
  };

const FullscreenTable = ({ tenantId, roomNumber,name, onClose }) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["summary", tenantId],
    queryFn: fetchSummary,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader className="animate-spin w-10 h-10 text-blue-500" />
      </div>
    );
  }

  if (isError || !Array.isArray(data)) {
    return <div className="text-red-500 text-center mt-10">Failed to load data</div>;
  }

  const summary = [...data].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  
  return (
    <div className="bg-white p-6 rounded shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">{roomNumber}, { name} - Payment Summary</h2>
        <button onClick={onClose} className="bg-red-500 text-white px-4 py-2 rounded">
          Close
        </button>
      </div>
  

      <div className="overflow-x-auto">
        <table className="w-full mb-4">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2">Month</th>
              <th className="p-2">Rent Amount</th>
              <th className="p-2">Electricity</th>
              <th className="p-2">Amount Paid</th>
              <th className="p-2">Balance</th>
              <th className="p-2">Status</th>
              <th className="p-2">Notes</th>
              <th className="p-2">TransactionID</th>
            </tr>
          </thead>
          <tbody>
            {summary.map((entry) => (
              <tr key={entry._id} className="border-b hover:bg-gray-50">
                <td className="p-2">
                  {new Date(entry.paymentMonth).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                  })}
                </td>
                <td className="p-2">{entry.rentAmount}</td>
                <td className="p-2">{entry.electricityBill}</td>
                <td className="p-2">{entry.amountPaid}</td>
                <td className="p-2">{entry.balance}</td>
                <td className="p-2">
                  <span className={`font-semibold ${entry.balance > 1 ? "text-yellow-500" : "text-green-500"}`}>
                    {entry.balance > 1 ? "Partially" : "Paid"}
                  </span>
                </td>
                <td className="p-2">{entry.notes}</td>
                <td className="p-2">{entry.transactionId}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
          <div className="h-96 mb-6">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={summary.reverse()}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="paymentMonth"
                  tickFormatter={(value) =>
                    new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      year: "2-digit",
                    })
                  }
                />
                <YAxis />
                <Tooltip
                  labelFormatter={(value) =>
                    new Date(value).toLocaleDateString("en-US", {
                      month: "long",
                      year: "numeric",
                    })
                  }
                />
                <Legend />
                <Bar dataKey="rentAmount" fill="#A9A9A9" name="Rent" />
                <Bar dataKey="electricityBill" fill="#00C0EF" name="Electricity" />
                <Bar dataKey="amountPaid" fill="#90EE90" name="Paid" />
                <Bar dataKey="balance" fill="#FFBB28" name="Balance" />
              </BarChart>
            </ResponsiveContainer>
          </div>
    </div>
  );
};

const HouseCard = ({ roomNumber, name, onClick }) => (
  <div
    className="w-60 h-40 bg-gradient-to-br from-gray-300 via-gray-400 to-blue-200 text-white flex items-center justify-center text-2xl rounded-xl shadow-md cursor-pointer hover:scale-105 transition"
    onClick={onClick}
  >
    {roomNumber} - {name}
  </div>
);

const HouseCardGrid = () => {
  const [selectedTenant, setSelectedTenant] = useState(null);

  const { data: tenants, isLoading, isError } = useQuery({
    queryKey: ["tenants"],
    queryFn: fetchTenants,
  });
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader className="animate-spin w-10 h-10 text-blue-500" />
      </div>
    );
  }

  if (isError || !Array.isArray(tenants)) {
    return <div className="text-red-500 text-center mt-10">Failed to load tenants</div>;
  }

  return (
    <div className="rounded-xl p-4 text-black shadow-md flex flex-col justify-between">
      <div className="flex flex-wrap gap-4">
        {tenants.map(({ _id, roomNumber, name}) => (
          <HouseCard
            key={_id}
            roomNumber={roomNumber}
            name={name}
            onClick={() => setSelectedTenant({ roomNumber: roomNumber,name: name, tenantId: _id })}
          />
        ))}
      </div>

      {selectedTenant && (
        <FullscreenTable
          tenantId={selectedTenant.tenantId}
          roomNumber={selectedTenant.roomNumber}
          name={selectedTenant.name}
          onClose={() => setSelectedTenant(null)}
        />
      )}
    </div>
  );
};

export default HouseCardGrid;
