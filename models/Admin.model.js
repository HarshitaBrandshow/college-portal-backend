const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true
    },
    mobile: {
        type: String,
    },
    pincode: {
        type: String,
    },
    lastLogin: {
        type: String,
    },
    status: {
        type: Boolean,
        default: true
    },
    role: {
        type: String,
        required: true,
        enum: [
            'superAdmin', 
            'portalSuperAdmin', 
            'portalDataEntry', 
            'collegeSuperAdmin', 
            'collegeLeadManagement'
        ] 
    },
    deleteflag: { 
        type: Boolean, default: false 
    }
}, { timestamps: true, timeseries: true });

module.exports = mongoose.model('Admin', adminSchema);
