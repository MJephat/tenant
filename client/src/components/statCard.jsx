import React from "react";
import {
    FaUser,
    FaShoppingCart,
    FaCalendarAlt,
    FaDollarSign,
  } from "react-icons/fa";
  import {
    LineChart,
    Line,
    BarChart,
    Bar,
    ResponsiveContainer,
    XAxis,
    YAxis,
    Tooltip,
  } from "recharts";
  
  const dataLine1 = [
    { value: 400 },
    { value: 300 },
    { value: 500 },
    { value: 200 },
    { value: 350 },
    { value: 250 },
    { value: 300 },
  ];
  
  const dataLine2 = [
    { value: 100 },
    { value: 200 },
    { value: 150 },
    { value: 180 },
    { value: 220 },
    { value: 300 },
    { value: 250 },
  ];
  
  const dataLine3 = [
    { value: 120 },
    { value: 110 },
    { value: 180 },
    { value: 250 },
    { value: 170 },
    { value: 140 },
    { value: 160 },
  ];
  
  const dataBar = [
    { value: 12 },
    { value: 18 },
    { value: 20 },
    { value: 10 },
    { value: 7 },
    { value: 15 },
    { value: 5 },
    { value: 12 },
    { value: 6 },
    { value: 8 },
    { value: 10 },
    { value: 14 },
  ];
  
  const cards = [
    {
      title: "members online",
      number: "10,368",
      icon: <FaUser size={24} />,
      bg: "from-gray-300 via-gray-400 to-gray-500",
      type: "line",
      data: dataLine1,
    },
    {
      title: "items sold",
      number: "388,688",
      icon: <FaShoppingCart size={24} />,
      bg: "from-gray-300 via-gray-400 to-gray-500",
      type: "line",
      data: dataLine2,
    },
    {
      title: "this week",
      number: "1,086",
      icon: <FaCalendarAlt size={24} />,
      bg: "from-gray-300 via-gray-400 to-gray-500",
      type: "line",
      data: dataLine3,
    },
    {
      title: "total earnings",
      number: "$1,060,386",
      icon: <FaDollarSign size={24} />,
      bg: "from-gray-300 via-gray-400 to-gray-500",
      type: "bar",
      data: dataBar,
    },
  ];
  
  const ChartCard = ({ card }) => {
    return (
      <div
        className={`rounded-xl p-4 text-white bg-gradient-to-br ${card.bg} shadow-md flex flex-col justify-between`}
      >
        <div className="flex items-center gap-4">
          <div className="text-3xl">{card.icon}</div>
          <div>
            <div className="text-2xl font-bold">{card.number}</div>
            <div className="text-sm text-white/80">{card.title}</div>
          </div>
        </div>
  
        {/* Mini Chart */}
        <div className="mt-4 h-16 w-full">
          <ResponsiveContainer width="100%" height="100%">
            {card.type === "line" ? (
              <LineChart data={card.data}>
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#fff"
                  strokeWidth={2}
                  dot={{ r: 2 }}
                />
              </LineChart>
            ) : (
              <BarChart data={card.data}>
                <Bar dataKey="value" fill="rgba(255, 255, 255, 0.5)" radius={4} />
              </BarChart>
            )}
          </ResponsiveContainer>
        </div>
      </div>
    );
  };
  
  const OverviewCards = () => {
    return (
      <div className="p-4 bg-gray-100 rounded-md">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">Overview</h2>
          {/* <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
            + Add Item
          </button> */}
        </div>
  
        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card, idx) => (
            <ChartCard key={idx} card={card} />
          ))}
        </div>
      </div>
    );
  };
  
  export default OverviewCards;
  