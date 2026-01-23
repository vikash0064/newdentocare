const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String },
    address: { type: String },
    treatment: { type: String, required: true },
    branch: { type: String, default: 'Palanpur Patia Branch' },
    date: { type: String, required: true },
    time: { type: String },
    urgency: { type: String, default: 'Normal' },
    message: { type: String },
    status: { type: String, default: 'pending' },
    reference: { type: String },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    createdAt: { type: Date, default: Date.now }
});

// Performance Indexes
appointmentSchema.index({ status: 1 });
appointmentSchema.index({ branch: 1 });
appointmentSchema.index({ date: 1 });
appointmentSchema.index({ createdAt: 1 }, { expireAfterSeconds: 86400 }); // TTL: 24 hours

module.exports = mongoose.model('Appointment', appointmentSchema);
