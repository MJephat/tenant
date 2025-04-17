import React from 'react';
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts';

const areaData = [
  { month: 'Jan', products: 100, services: 50 },
  { month: 'Feb', products: 80, services: 55 },
  { month: 'Mar', products: 60, services: 70 },
  { month: 'Apr', products: 95, services: 120 },
  { month: 'May', products: 100, services: 50 },
  { month: 'Jun', products: 80, services: 55 },
  { month: 'Jul', products: 60, services: 70 },
  { month: 'Aug', products: 95, services: 120 },
  { month: 'Sep', products: 100, services: 50 },
  { month: 'Oct', products: 80, services: 55 },
  { month: 'Nov', products: 60, services: 70 },
  { month: 'Dec', products: 95, services: 120 },
  
];

const pieData = [
  { name: 'Products', value: 10 },
  { name: 'Services', value: 90},
];

const COLORS = ['#00C0EF', '#90EE90'];

const ReportCharts = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-gray-100">
      
      {/* Area Chart Card */}
      <div className="bg-white p-6 rounded-xl shadow">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Recent Reports</h2>
          <div className="text-sm space-x-4 hidden md:flex">
            <span className="text-green-500 font-medium">↑ 25% <span className="text-gray-600">Products</span></span>
            <br></br>
            <span className="text-red-500 font-medium">↓ 10% <span className="text-gray-600">Services</span></span>
          </div>
        </div>
        
        <div className="flex space-x-6 text-sm mb-4">
          <span className="flex items-center space-x-2 text-blue-500">
            <span className="w-2 h-2 rounded-full bg-blue-500"></span>
            <span>Products</span>
          </span>
          <span className="flex items-center space-x-2 text-green-500">
            <span className="w-2 h-2 rounded-full bg-green-500"></span>
            <span>Services</span>
          </span>
        </div>

        <ResponsiveContainer width="100%" height={200}>
          <AreaChart data={areaData}>
            <defs>
              <linearGradient id="colorProducts" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#00C0EF" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#00C0EF" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorServices" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#00d97e" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#00d97e" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Area type="monotone" dataKey="products" stroke="#00C0EF" fillOpacity={1} fill="url(#colorProducts)" />
            <Area type="monotone" dataKey="services" stroke="#00d97e" fillOpacity={1} fill="url(#colorServices)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Donut Chart Card */}
      <div className="bg-white p-6 rounded-xl shadow flex flex-col items-center">
        <h2 className="text-xl font-semibold mb-4 self-start">Char By %</h2>
        <div className="flex space-x-4 mb-4 text-sm self-start">
          <span className="flex items-center space-x-2 text-blue-500">
            <span className="w-2 h-2 rounded-full bg-blue-400"></span>
            <span>Products</span>
          </span>
          <span className="flex items-center space-x-2 text-red-500">
            <span className="w-2 h-2 rounded-full bg-red-500"></span>
            <span>Services</span>
          </span>
        </div>

        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie
              data={pieData}
              innerRadius={60}
              outerRadius={80}
              paddingAngle={3}
              dataKey="value"
            >
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
