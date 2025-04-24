import React from "react";
import { FaUser, FaShoppingCart, FaCalendarAlt, FaDollarSign, FaMoneyBill, FaBalanceScale, FaBolt } from "react-icons/fa";
import { LineChart, Line, BarChart, Bar, ResponsiveContainer } from "recharts";
import { useQuery } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import { axiosInstance } from "../assets/axios.jsx";

const dataLine1 = [
  { value: 400 }, { value: 300 }, { value: 500 }, { value: 200 },
  { value: 350 }, { value: 250 }, { value: 300 },
];

const dataLine2 = [
  { value: 100 }, { value: 200 }, { value: 150 }, { value: 180 },
  { value: 220 }, { value: 300 }, { value: 250 },
];

const dataLine3 = [
  { value: 120 }, { value: 110 }, { value: 180 }, { value: 250 },
  { value: 170 }, { value: 140 }, { value: 160 },
];

const dataBar = [
  { value: 12 }, { value: 18 }, { value: 20 }, { value: 10 }, { value: 7 }, { value: 15 },
  { value: 5 }, { value: 12 }, { value: 6 }, { value: 8 }, { value: 10 }, { value: 14 },
];

const fetchTenant = async () => {
  try {
    const response = await axiosInstance.get("/tenant");
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch tenants");
  }
};

const fetchPayment = async () => {
  try {
    const response = await axiosInstance.get("/payment/");
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch payments");
  }
};

const ChartCard = ({ card }) => {
  return (
    <div className={`rounded-xl p-4 text-white bg-gradient-to-br ${card.bg} shadow-md flex flex-col justify-between`}>
      <div className="flex items-center gap-4">
        <div className="text-3xl">{card.icon}</div>
        <div>
          <div className="text-2xl font-bold">{card.number}</div>
          <div className="text-sm text-white/80">{card.title}</div>
        </div>
      </div>
      <div className="mt-4 h-16 w-full">
        <ResponsiveContainer width="100%" height="100%">
          {card.type === "line" ? (
            <LineChart data={card.data}>
              <Line type="monotone" dataKey="value" stroke="#fff" strokeWidth={2} dot={{ r: 2 }} />
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
  const { data: tenantsData, isLoading: isTenantsLoading, error:tenantsError } = useQuery({
    queryKey: ["tenantsData"],
    queryFn: fetchTenant,
  });

  const { data: paymentsData, isLoading: isPaymentsLoading, error: paymentsError   } = useQuery({
    queryKey: ["paymentsData"],
    queryFn: fetchPayment,
  });
  
  const tenants = Array.isArray(tenantsData) ? tenantsData : tenantsData?.tenants || [];
  const payments = Array.isArray(paymentsData) ? paymentsData : paymentsData?.payments || [];

  if (isPaymentsLoading || isTenantsLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="animate-spin h-16 w-16 text-blue-500" />
      </div>
    );
  }

  if (tenantsError || paymentsError) {
    return <div className="text-red-500">Error: {tenantsError?.message || paymentsError?.message}</div>;
  }


  const totalPaid = payments.reduce((sum, payment) => sum + payment.amountPaid, 0);
  const electricityBill = payments.reduce((sum, payment) => sum + (payment.electricityBill || 0), 0);
  const unpaidBalance = payments.reduce((sum, payment) => sum + (payment.balance || 0), 0);

  const cards = [
    {
      title: "Tenants on Board",
      number: tenants?.length || "0",
      icon: <FaUser size={24} />,
      bg: "from-gray-300 via-gray-400 to-gray-500",
      type: "line",
      data: dataLine1,
    },
    {
      title: "Amount Paid",
      number: "Ksh " + totalPaid.toFixed(2),
      icon: <FaMoneyBill size={24} />,
      bg: "from-gray-300 via-gray-400 to-gray-500",
      type: "line",
      data: dataLine2,
    },
    {
      title: "Electricity Bill Paid",
      number: "Ksh " + electricityBill.toFixed(2),
      icon: <FaBolt size={24} />,
      bg: "from-gray-300 via-gray-400 to-gray-500",
      type: "line",
      data: dataLine3,
    },
    {
      title: "Unpaid Balance",
      number: "Ksh" + unpaidBalance.toFixed(2),
      icon: <FaBalanceScale size={24} />,
      bg: "from-gray-300 via-gray-400 to-gray-500",
      type: "bar",
      data: dataBar,
    },
  ];

  return (
    <div className="p-4 bg-gray-100 rounded-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Overview</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, idx) => (
          <ChartCard key={idx} card={card} />
        ))}
      </div>
    </div>
  );
};

export default OverviewCards;
