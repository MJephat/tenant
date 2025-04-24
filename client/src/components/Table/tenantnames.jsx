import React, { useState } from "react";
import { axiosInstance } from "../../assets/axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import AddTenant from "../../form/addTenant";

const fetchTenants = async () => {
  const response = await axiosInstance.get("/tenant");
  return response.data.tenants;
};

const deleteTenant = async (id) => {
  await axiosInstance.delete(`/tenant/${id}`);
};

const updatedTenant = async ({ id, updatedData }) => {
  const response = await axiosInstance.put(`/tenant/${id}`, updatedData);
  return response.data.tenants;
};

const DataTable = () => {
  const [editRow, setEditRow] = useState(null);
  const [editData, setEditData] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [showForm, setShowForm] = useState(false);

  const itemsPerPage = 15;

  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["tenants"],
    queryFn: fetchTenants,
  });

  const tenants = Array.isArray(data) ? data : data?.tenants || [];

  const deleteMutation = useMutation({
    mutationFn: deleteTenant,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tenants"]}),
  });

  const updateMutation = useMutation({
    mutationFn: updatedTenant,
    onSuccess: () =>{   
      queryClient.invalidateQueries({ queryKey: ["tenants"]});
      setEditRow(null);
    
    },
  });

const handleEdit = (tenant) => {
    setEditRow(tenant._id);
    setEditData({ ...tenant });
  };

  const handleChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    updateMutation.mutate({ id: editRow, updatedData: editData });
  };


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





  const totalPages = Math.ceil(tenants.length / itemsPerPage);
  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const paginatedData = tenants.slice(start, end);

  return (
    <div className="bg-white p-6 rounded shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Tenant Table</h2>
        <button className="bg-green-300 text-white text-xl px-4 rounded-full"
          onClick={() => setShowForm(true)}>
          Add Tenant
        </button>
      </div>
      {showForm && <AddTenant onClose={() => setShowForm(false)} />}
      <div className="overflow-x-auto">
        <table className="w-full mb-4">
          <thead>
            <tr>
              <th>Tenant Number</th>
              <th>Tenant Name</th>
              <th>Room Number</th>
              <th>Rent Amount</th>
              <th>Electricity Bill</th>
              <th>Entry Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((tenant) => (
              <tr key={tenant._id} className="border-b hover:bg-gray-50">
                <td className="p-2">{tenant.TenantNo}</td>
                <td className="p-2">
                  {editRow === tenant._id ? (
                    <input type="text" name="name" value={editData.name} onChange={handleChange} className="border px-2 w-full" />
                  ) : (
                    tenant.name
                  )}
                </td>
                <td className="p-2">
                  {editRow === tenant._id ? (
                    <input type="text" name="roomNumber" value={editData.roomNumber} onChange={handleChange} className="border px-2 w-full" />
                  ) : (
                    tenant.roomNumber
                  )}
                </td>
                <td className="p-2">
                  {editRow === tenant._id ? (
                  < input type="number" name="rentAmount" value={editData.rentAmount} onChange={handleChange} className="border px-2 w-full" />
                ) : (
                  `Ksh. ${tenant.rentAmount?.toFixed(2)}`)}
                  </td>
                <td className="p-2">Ksh. {tenant.electricityBill?.toFixed(2)}</td>
                <td className="p-2">{new Date(tenant.createdAt).toLocaleDateString("en-GB")}</td>
                <td className="p-2 flex gap-2">
                  {editRow === tenant._id ? (
                    <>
                      <button onClick={handleSave} className="bg-green-500 text-white text-xs px-3 rounded-full">Save</button>
                      <button onClick={() => setEditRow(null)} className="bg-gray-500 text-white text-xs px-3 rounded-full">Cancel</button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => handleEdit(tenant)} className="bg-orange-500 text-white text-xs px-3 rounded-full">Edit</button>
                      <button onClick={() => deleteMutation.mutate(tenant._id)} className="bg-red-500 text-white text-xs px-3 rounded-full">Delete</button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-center items-center gap-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
          >
            Previous
          </button>
          <span>Page {currentPage} of {totalPages}</span>
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
