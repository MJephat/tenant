
import React, { useState } from "react";
import { axiosInstance } from "../assets/axios";
import { toast } from "react-hot-toast";

const AddTenant = ({onClose}) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    roomNumber: "",
    rentAmount: "",
    // electricityBill: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axiosInstance.post("/tenant/", {
        ...formData,
        rentAmount: Number(formData.rentAmount),
        // electricityBill: formData.electricityBill ? Number(formData.electricityBill) : 0,

    });
  
      
      toast.success("Tenant added successfully!");

      setFormData({
        name: "",
        phone: "",
        roomNumber: "",
        rentAmount: "",
        // electricityBill: "",
      });
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      toast.error(error.response?.data?.message ||"Error adding tenant.");
    }
  };
  

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-lg mt-6">
        <button
          className=" text-gray-500 hover:text-gray-700 text-xl rounded"
          onClick={onClose} // ✅ Close form when clicked
        >
          X
        </button>
      <h2 className="text-xl font-bold mb-4 text-center">Tenant Entry Form</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* tenant name */}
        <div>
          <label className="block font-semibold"> Full Name</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required 
          placeholder="Enter Tant Name"
          className="w-full border-gray-300 p-2 rounded placeholder:text-gray-400"/>
        </div>

         {/* tenant Telephone */}
         <div>
          <label className="block font-semibold"> Phone Number</label>
          <input type="number" name="phone" value={formData.phone} onChange={handleChange} required
            className="w-full border-gray-300 p-2 rounded placeholder:text-gray-400"
            placeholder="Enter phone number"
          />
        </div>

        {/* room  */}
        <div>
          <label className="block font-semibold">Room</label>
          <input type="text" name="roomNumber" value={formData.roomNumber} onChange={handleChange} required
            placeholder="Enter room number"
            className="w-full border-gray-300 p-2 rounded placeholder:text-gray-400"
          />
        </div>

        {/* Rent Amount */}
        <div>
          <label className="block font-semibold">Monthly Rent</label>
          <input type="number" name="rentAmount" value={formData.rentAmount} onChange={handleChange} required
            className="w-full border-gray-300 p-2 rounded placeholder:text-gray-400"
            placeholder="Enter Monthly amount"
          />
        </div>

        {/* Submit Button */}
        <button type="submit" className="w-full bg-green-300 text-white p-2 rounded hover:bg-green-400 transition">
            submit
        </button>
      </form>
    </div>
  );
};

export default AddTenant;