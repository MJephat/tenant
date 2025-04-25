import { toast } from 'react-hot-toast';
import React, { useState } from "react";
import { axiosInstance } from "../../assets/axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader, StepBack, StepForward } from "lucide-react";


const fetchPayments = async () => {
    const response = await axiosInstance.get("/payment");
    return response.data.payments;
}

const deletePayment = async (id) => {
    await axiosInstance.delete(`/payment/${id}`);
}

const updatedPayment = async ({ id, updatedData }) => {
    const response = await axiosInstance.put(`/payment/editpayment/${id}`, updatedData);
    return response.data.payments;
}

const PaymentsTable = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [editRow, setEditRow] = useState(null);
    const [editData, setEditData] = useState({});
    const itemsPerPage = 6;

    const queryClient = useQueryClient();


    const { data, isLoading, isError } = useQuery({
        queryKey: ["payments"],
        queryFn: fetchPayments,
    });

    const payments = Array.isArray(data) ? data : data?.payments || [];

    const deleteMutation = useMutation({
        mutationFn: deletePayment,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["payments"] });
            toast.success("Payment deleted successfully");
        }
    });

    const updateMutation = useMutation({
    mutationFn: updatedPayment,
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["payments"] });
        toast.success("Payment updated successfully");
        setEditRow(null);
    },
    onError: (error) => {
        toast.error(error.response?.data?.message || "Error updating payment", error.message);
        }
    });

    const handleEdit = (payment) => {
        setEditRow(payment._id);
        setEditData({ ...payment });
    };

    const handleChange = (e) => {
        setEditData({ ...editData, [e.target.name]: e.target.value });
    };

    const handleSave = (id) => {
        updateMutation.mutate({ id:editRow, updatedData: editData });
    };

    
    if (isLoading) {
        return <div className="flex justify-center items-center h-screen">
            <Loader className="animate-spin" />
            </div>;
    }if (isError) {
        return <div>Error loading payments</div>;
    }

    const totalPages = Math.ceil(payments.length / itemsPerPage);
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const paginatedData = payments.slice(start, end);

    return (
        <div className="bg-white p-6 rounded shodow">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Payments</h2>
                {/* <button className="bg-green-400 text-white text-xs px-4 rounded-full">
                    Add Payment
                </button> */}
            </div>
            <div className="overflow-x-auto">
                <table className="w-full mb-4">
                    <thead>
                        <tr>
                            <th>Tenant</th>
                            <th>Room</th>
                            <th>Paid Amt</th>
                            <th>Electricity</th>
                            <th>Balance</th>
                            <th>Status</th>
                            <th>Month</th>
                            <th>Type</th>
                            <th>signatory</th>
                            <th>Trans_id</th>
                            <th>Note</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                    {paginatedData.map((payment) => (
                        <tr key={payment._id} className="border-t hover:bg-gray-50">
                        <td className="p-2">{payment.tenantId?.name}</td>
                        <td className="p-2">{payment.tenantId?.roomNumber}</td>
                        <td className="p-2">
                            {editRow === payment._id ? (
                                <input type="text" name="amountPaid" value={editData.amountPaid} onChange={handleChange}
                                    className="border rounded px-2 py-1"
                                />
                            ):(
                                `Ksh. ${payment.amountPaid}`
                            )}
                            </td>
                        <td className="p-2">
                            {editRow === payment._id ? (
                                <input type="text" name="electricityBill" value={editData.electricityBill} onChange={handleChange}
                                    className="border rounded px-2 py-1"
                                />
                            ):(
                                `Ksh. ${payment.electricityBill}`
                            )}
                        </td>
                        <td className="p-2">Ksh. {payment.balance}</td>
                        <td className="p-2">
                            {editRow === payment._id ? (
                                <select name="paymentStatus" value={editData.paymentStatus} onChange={handleChange} className="border rounded px-2 py-1">
                                <option value="Paid">Paid</option>
                                <option value="Partially">Partially</option>
                                </select>
                            ) : (
                                <span className={`font-bold ${payment.balance > 1 ? "text-yellow-500" : "text-green-500"}`}
                                >
                                {payment.balance > 1 ? "Partially" : "Paid"}
                                </span>
                            )}
                            </td>

                        <td className="p-2">{new Date(payment.paymentMonth).toLocaleDateString('en-GB', { month: 'short', year: 'numeric' })}</td>
                        <td className="p-2">{editRow === payment._id ? (
                            <select name="paymentType" value={editData.paymentType} onChange={handleChange}
                                className="border rounded px-2 py-1"
                            >
                                <option value="Cash">Cash</option>
                                <option value="Mpesa">Mpesa</option>
                                <option value="Bank">Bank</option>
                                <option value="Cheque">Cheque</option>
                            </select>
                        ):(
                            payment.paymentType
                        )}
                        </td>
                        <td className="p-2">{payment.paidBy?.username}</td>
                        <td className="p-2">{payment.transactionId}</td>
                        <td className="p-2">{editRow === payment._id ? (
                            <input type="text" name="notes" value={editData.notes} onChange={handleChange}
                                className="border rounded px-2 py-1"
                            />
                        ):(
                            payment.notes
                        )}
                        </td>
                        <td className="p-2 flex gap-2">
                            {editRow === payment._id ? (
                                <>
                                    <button onClick ={handleSave} className="bg-green-500 text-white text-xs px-3 rounded-full">Save</button>
                                    <button onClick={() => setEditRow(null)} className="bg-gray-500 text-white text-xs px-3 rounded-full">Cancel</button>
                                </>
                            ): (    
                            <>
                            <button onClick={() =>handleEdit(payment)}className="bg-orange-500 text-white text-xs px-3 rounded-full">Edit</button>
                            <button onClick={()=>deleteMutation.mutate(payment._id)}className="bg-red-500 text-white text-xs px-3 rounded-full">Delete</button>
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
                        <StepBack className="h-4 w-4" />
                    </button>
                    <span>Page {currentPage} of {totalPages}</span>
                    <button
                        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
                    >
                        <StepForward className="h-4 w-4" />
                    </button>
          </div>
            </div>
        </div>
    );
}

export default PaymentsTable;