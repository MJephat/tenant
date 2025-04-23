import React from 'react';
import {AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell} from 'recharts';
import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from '../assets/axios';
import { Loader } from 'lucide-react';
import { toast } from 'react-hot-toast';


const pieData = [
  { name: 'Products', value: 10 },
  { name: 'Services', value: 90},
];

const COLORS = ['#00C0EF', '#90EE90'];
const ReportCharts = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['monthlySummary'],
    queryFn: async () => {
      try {
        const res = await axiosInstance.get('/payment/summary');
        console.log("API RESPONSE: ", res.data);
        return res.data.data;
      } catch (err) {
        console.log("API ERROR: ", err);
        toast.error(err?.response?.data?.message || 'Something went wrong');
        throw err;
      }
    }
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

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-gray-100">
    <div className="bg-white p-6 rounded-xl shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Monthly Reports {new Date().getFullYear()} </h2>
      </div>
      
      <div className="flex space-x-6 text-sm mb-4">
        <span className="flex items-center space-x-2 text-blue-500">
          <span className="w-2 h-2 rounded-full bg-blue-500"></span>
          <span>Amount Paid</span>
        </span>
        <span className="flex items-center space-x-2 text-green-500">
          <span className="w-2 h-2 rounded-full bg-green-500"></span>
          <span>Electricity Bill</span>
        </span>
      </div>


      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="paidGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#00C0EF" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#00C0EF" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="billGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#00FF00" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#00FF00" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Area type="monotone" dataKey="totalAmountPaid" stroke="#00C0EF" fill="url(#paidGradient)" />
          <Area type="monotone" dataKey="totalElectricityBill" stroke="#00FF00" fill="url(#billGradient)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>

       {/* Donut Chart Card */}
      <div className="bg-white p-6 rounded-xl shadow flex flex-col items-center">
        <h2 className="text-xl font-semibold mb-4 self-start">Char By %</h2>
        <div className="flex space-x-4 mb-4 text-sm self-start">
          <span className="flex items-center space-x-2 text-blue-500">
            <span className="w-2 h-2 rounded-full bg-blue-400"></span>
            <span>Electricity Bill</span>
          </span>
          <span className="flex items-center space-x-2 text-green-500">
            <span className="w-2 h-2 rounded-full bg-green-500"></span>
            <span>Amount Paid</span>
          </span>
        </div>

        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie data={pieData} innerRadius={60} outerRadius={80} paddingAngle={3} dataKey="value">
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
};

export default ReportCharts;
