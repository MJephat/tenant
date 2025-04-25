import { toast } from 'react-hot-toast';
import React, { useState } from 'react'
import {axiosInstance} from '../assets/axios.jsx';
import { useParams } from 'react-router-dom';

const PaymentForm = () => {
    const {id} =    useParams();
    const [formData, setFormData] = useState({
        amountPaid: "",
        electricityBill: "",
        paymentType: 'Cash',
        paymentMonth: "",
        notes: "",
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try{
            await axiosInstance.post(`/payment/payrent/${id}`, formData);
            toast.success("Payment added successfully");
            setFormData({
                amountPaid: "",
                electricityBill: "",
                paymentType: 'Cash',
                paymentMonth: "",
                notes: "",
            });
        }catch(err){
            toast.error(err.response.data.message || "Error while making payment");
        }
    };
  return (
    <form onSubmit={handleSubmit} className='p-4 space-y-4'>
        <input type="number" name="amountPaid" value={formData.amountPaid} onChange={handleChange} placeholder='Amount Paid' className='w-full p-2 border rounded' required />
        <input type="number" name="electricityBill" value={formData.electricityBill} onChange={handleChange} placeholder='Electricity Bill' className='w-full p-2 border rounded' required />
        <select name="paymentType" value={formData.paymentType} onChange={handleChange} className='w-full p-2 border rounded' required>
            <option value="Cash">Cash</option>
            <option value="Bank">Bank</option>
            <option value="Mpesa">Mpesa</option>
            <option value="Cheque">Cheque</option>
        </select>
        <input type="text" name="paymentMonth" value={formData.paymentMonth} onChange={handleChange} placeholder='Payment Month' className='w-full p-2 border rounded' required />
        <textarea name="notes" value={formData.notes} onChange={handleChange} placeholder='Notes' className='w-full p-2 border rounded' rows="4"></textarea>
        <button type="submit" className='w-full p-2 bg-blue-400 text-white rounded'>Make Payment $</button>
      
    </form>
  )
}

export default PaymentForm;
