import Tenant from "../models/tenant.model.js";


export const addTenant = async (req, res) => {
    try {
        const { name, phone, roomNumber, rentAmount } = req.body;
        if (!name || !phone || !roomNumber || !rentAmount) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const roomOccupied = await Tenant.findOne({ roomNumber });
        if (roomOccupied) {
            return res.status(400).json({ message: 'Room is already occupied' });
        };

        const tenant = new Tenant({
            name,
            phone,
            roomNumber,
            rentAmount
        });
        await tenant.save();

        res.status(201).json({ message: 'Tenant added successfully', tenant });
    } catch (error) {
        res.status(500).json({ message: 'Error adding tenant', error });
    }
};

//  create a function that will get all tenants
export const getTenants = async (req, res) => {
    try {
        const tenants = await Tenant.find();
        res.status(200).json({ tenants });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching tenants', error });
    }
};

// get tenant by id
export const getTenant = async (req, res) => {
    try {
        const tenant = await Tenant.findById(req.params.id);
        if (!tenant) {
            return res.status(404).json({ message: 'Tenant not found' });
        }
        res.status(200).json({ tenant });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching tenant', error });
    }
};

// update tenant
export const updateTenant = async (req, res) => {
    try {
        const tenant = await Tenant.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!tenant) {
            return res.status(404).json({ message: 'Tenant not found' });
        }
        if (req.body.roomNumber) {
            const roomOccupied = await Tenant.findOne({ roomNumber: req.body.roomNumber, _id: { $ne: req.params.id } });
            if (roomOccupied) {
                return res.status(400).json({ message: 'Room is already occupied' });
            }
        }
        res.status(200).json({ message: 'Tenant updated successfully', tenant });
    } catch (error) {
        res.status(500).json({ message: 'Error updating tenant', error });
    }
}
// delete tenant
export const deleteTenant = async (req, res) => {
    try {
        const tenant = await Tenant.findByIdAndDelete(req.params.id);
        if (!tenant) {
            return res.status(404).json({ message: 'Tenant not found' });
        }
        res.status(200).json({ message: 'Tenant deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting tenant', error });
    }
};