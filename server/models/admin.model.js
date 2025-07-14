import mongoose from 'mongoose';

const adminSchema = new mongoose.Schema({
    username: { type: String, required: true},
    password: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    role: {type: String, enum: ['admin'], default: 'admin'},
    createdAt: {type: Date, default: ()=>{
        const now = new Date();
        return new Date(now.getFullYear(), now.getMonth(), now.getDate());
    }}
});

// Format createdAt on response
adminSchema.set('toJSON', {
    transform: function (doc, ret) {
      delete ret.password;
  
      if (ret.createdAt) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        ret.createdAt = new Date(ret.createdAt).toLocaleDateString('en-US', options); // e.g., "April 15, 2025"
      }
  
      return ret;
    }
  });

const Admin = mongoose.model('Admin', adminSchema);
export default Admin;