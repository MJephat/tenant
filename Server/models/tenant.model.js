const mongoose = require('mongoose');

const tenantSchema = new mongoose.Schema({
  name: { type: String, required: true},
  phone: { type: String},
  roomNumber: { type: String, required: true },
  rentAmount: { type: Number },
  createdAt: {type: Date, default:Date.now}
});

const Tenant = mongoose.model('Tenant', tenantSchema);
module.exports = Tenant;

