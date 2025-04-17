import React, { useState, useEffect } from "react";

// Dummy data (you can add more items to test pagination)
const dummyData = [
  {
    _id: "1",
    TenantNo: "POL12345",
    Name: "John Doe",
    policyType: "Rent",
    rentAmount: 5000,
    electricityAmount: 150,
    dueDate: "2024-01-01",
    status: "Paid",
  },
  {
    _id: "2",
    TenantNo: "POL12346",
    Name: "Jane Smith",
    policyType: "Rent",
    rentAmount: 6000,
    electricityAmount: 200,
    dueDate: "2024-02-01",
    status: "waiting",
  },
  {
    _id: "3",
    TenantNo: "POL12347",
    Name: "Alex Johnson",
    policyType: "Rent",
    rentAmount: 4500,
    electricityAmount: 120,
    dueDate: "2024-03-01",
    status: "evicted",
  },
  {
    _id: "4",
    TenantNo: "POL12348",
    Name: "Emily Rose",
    policyType: "Let",
    rentAmount: 7000,
    electricityAmount: 180,
    dueDate: "2024-04-01",
    status: "Paid",
  },
  {
    _id: "5",
    TenantNo: "POL12349",
    Name: "Chris Ray",
    policyType: "BNB",
    rentAmount: 7500,
    electricityAmount: 160,
    dueDate: "2024-05-01",
    status: "waiting",
  },
  {
    _id: "6",
    TenantNo: "POL12350",
    Name: "Laura King",
    policyType: "Rent",
    rentAmount: 5200,
    electricityAmount: 130,
    dueDate: "2024-06-01",
    status: "Paid",
  },
  {
    _id: "7",
    TenantNo: "POL12351",
    Name: "Sam Walker",
    policyType: "Let",
    rentAmount: 6700,
    electricityAmount: 190,
    dueDate: "2024-07-01",
    status: "waiting",
  },
  {
    _id: "8",
    TenantNo: "POL12352",
    Name: "Nina Brown",
    policyType: "BNB",
    rentAmount: 8000,
    electricityAmount: 210,
    dueDate: "2024-08-01",
    status: "Paid",
  },
  {
    _id: "9",
    TenantNo: "POL12353",
    Name: "Michael Lee",
    policyType: "Rent",
    rentAmount: 4800,
    electricityAmount: 140,
    dueDate: "2024-09-01",
    status: "evicted",
  },
  {
    _id: "10",
    TenantNo: "POL12354",
    Name: "Sophia Green",
    policyType: "Let",
    rentAmount: 7100,
    electricityAmount: 175,
    dueDate: "2024-10-01",
    status: "Paid",
  },
  {
    _id: "11",
    TenantNo: "POL12355",
    Name: "David Clark",
    policyType: "BNB",
    rentAmount: 7300,
    electricityAmount: 165,
    dueDate: "2024-11-01",
    status: "waiting",
  },
  {
    _id: "12",
    TenantNo: "POL12356",
    Name: "Olivia Scott",
    policyType: "Rent",
    rentAmount: 4600,
    electricityAmount: 150,
    dueDate: "2024-12-01",
    status: "Paid",
  },
  {
    _id: "13",
    TenantNo: "POL12357",
    Name: "Ethan Brooks",
    policyType: "Let",
    rentAmount: 6800,
    electricityAmount: 170,
    dueDate: "2025-01-01",
    status: "evicted",
  },
  {
    _id: "14",
    TenantNo: "POL12358",
    Name: "Mia Wilson",
    policyType: "Rent",
    rentAmount: 4900,
    electricityAmount: 155,
    dueDate: "2025-02-01",
    status: "Paid",
  },
  {
    _id: "15",
    TenantNo: "POL12359",
    Name: "Liam Turner",
    policyType: "BNB",
    rentAmount: 7700,
    electricityAmount: 185,
    dueDate: "2025-03-01",
    status: "waiting",
  },
];

const DataTable = () => {
  const [editRow, setEditRow] = useState(null);
  const [editData, setEditData] = useState({});
  const [policies, setPolicies] = useState([]);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

  useEffect(() => {
    setPolicies(dummyData);
  }, []);

  const deletePolicy = (id) => {
    setPolicies((prev) => prev.filter((policy) => policy._id !== id));
  };

  const updatePolicy = ({ id, updatedData }) => {
    setPolicies((prev) =>
      prev.map((policy) => (policy._id === id ? { ...policy, ...updatedData } : policy))
    );
    setEditRow(null);
  };

  const handleEdit = (policy) => {
    setEditRow(policy._id);
    setEditData({ ...policy });
  };

  const handleChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    updatePolicy({ id: editRow, updatedData: editData });
  };

  const totalPages = Math.ceil(policies.length / itemsPerPage);
  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const paginatedData = policies.slice(start, end);

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-lg font-semibold mb-4">Tenants Table</h2>

      <div className="overflow-x-auto">
        <table className="w-full mb-4">
          <thead>
            <tr>
              <th>Tenant No</th>
              <th>Name</th>
              <th>Type</th>
              <th>Rent</th>
              <th>Electricity</th>
              <th>Due</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((policy) => (
              <tr key={policy._id} className="border-b hover:bg-gray-50">
                <td className="p-2">{policy.TenantNo}</td>
                <td className="p-2">
                  {editRow === policy._id ? (
                    <input
                      type="text"
                      name="Name"
                      value={editData.Name}
                      onChange={handleChange}
                      className="border px-2 w-full"
                    />
                  ) : (
                    policy.Name
                  )}
                </td>
                <td className="p-2">
                  {editRow === policy._id ? (
                    <select
                      name="policyType"
                      value={editData.policyType}
                      onChange={handleChange}
                      className="border px-2 w-full"
                    >
                      <option>Rent</option>
                      <option>Let</option>
                      <option>BNB</option>
                      <option>Lounge</option>
                    </select>
                  ) : (
                    policy.policyType
                  )}
                </td>
                <td className="p-2">Ksh. {policy.rentAmount.toFixed(2)}</td>
                <td className="p-2">Ksh. {policy.electricityAmount.toFixed(2)}</td>
                <td className="p-2">{new Date(policy.dueDate).toLocaleDateString("en-GB")}</td>
                <td className="p-2">
                  <span
                    className={`text-white text-xs px-3 py-1 rounded-full ${
                      policy.status === "Paid"
                        ? "bg-green-500"
                        : policy.status === "waiting"
                        ? "bg-orange-300"
                        : policy.status === "evicted"
                        ? "bg-red-300"
                        : "bg-gray-500"
                    }`}
                  >
                    {policy.status}
                  </span>
                </td>
                <td className="p-2 flex gap-2">
                  {editRow === policy._id ? (
                    <>
                      <button onClick={handleSave} className="bg-green-500 text-white text-xs px-3 rounded-full">
                        Save
                      </button>
                      <button onClick={() => setEditRow(null)} className="bg-gray-500 text-white text-xs px-3 rounded-full">
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => handleEdit(policy)} className="bg-orange-500 text-white text-xs px-3 rounded-full">
                        Edit
                      </button>
                      <button onClick={() => deletePolicy(policy._id)} className="bg-red-500 text-white text-xs px-3 rounded-full">
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination Controls */}
        <div className="flex justify-center items-center gap-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
          >
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default DataTable;
