import mongoose from 'mongoose';


const tenantSchema = new mongoose.Schema({
  TenantNo:{
    type: String,
    required: true,
    default: function(){
      return "DTN-" + this._id.toString().slice(-6); // Generate a unique tenant number
    },
  },
  name: { type: String, required: true},
  phone: { type: String},
  roomNumber: { type: String, required: true, unique: true},
  rentAmount: { type: String },
  createdAt: {type: Date, default:Date.now}
});

const Tenant = mongoose.model('Tenant', tenantSchema);
export default Tenant;
