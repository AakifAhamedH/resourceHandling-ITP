const mongoose = require('mongoose'); 

const ResourceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    frequency: { // Maintenance frequency (e.g., monthly, yearly)
        type: String,
        required: true
    },
    lastMaintenanceDate: { // Last maintenance date
        type: Date,
        required: true
    },
    nextMaintenanceDate: { // Next maintenance date
        type: Date,
        required: true
    },
    note: { // Any additional notes
        type: String
    },
    purchaseCost: { // Purchase cost of the resource
        type: Number,
        required: true
    },
    depreciationCost: { // Depreciation cost over time
        type: Number,
        required: true
    },
    annualMaintenanceCost: { // Annual maintenance cost
        type: Number,
        required: true
    },
    operatingCost: { // Operating cost of the resource
        type: Number,
        required: true
    }
});

module.exports = mongoose.model("ResourceShedule", ResourceSchema);
