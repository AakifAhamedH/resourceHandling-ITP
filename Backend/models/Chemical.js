const mongoose = require('mongoose');

const ChemicalResourceSchema = new mongoose.Schema({
    chemicalName: {
        type: String,
        required: true
    },
    quantity: {
        type: String,
        required: true
    },
    hazardClassification: {
        type: String,
        required: true
    },
    expiryDate: {
        type: Date,
        required: true
    },
    purchaseDate: {
        type: Date,
        required: true
    },
    purchaseCost: {
        type: Number,
        required: true
    },
    storageCondition: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("Chemical", ChemicalResourceSchema);
