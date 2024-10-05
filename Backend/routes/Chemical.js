const express = require("express");
const router = express.Router();
const ChemicalResource = require("../models/Chemical"); // Update model path if necessary

// Getting all chemical resources
router.get('/', async (req, res) => {
    try {
        const chemicals = await ChemicalResource.find();
        res.json(chemicals);
    } catch (error) {
        res.status(500).send('Error: ' + error);
    }
});

// Getting one chemical resource by ID
router.get('/:id', async (req, res) => {
    try {
        const chemical = await ChemicalResource.findById(req.params.id);
        if (!chemical) return res.status(404).send('Chemical resource not found');
        res.json(chemical);
    } catch (error) {
        res.status(500).send('Error: ' + error);
    }
});

// Posting a new chemical resource
router.post('/', async (req, res) => {
    const chemical = new ChemicalResource({
        chemicalName: req.body.chemicalName,
        quantity: req.body.quantity,
        hazardClassification: req.body.hazardClassification,
        expiryDate: req.body.expiryDate,
        purchaseDate: req.body.purchaseDate,
        purchaseCost: req.body.purchaseCost,
        storageCondition: req.body.storageCondition
    });
    try {
        const savedChemical = await chemical.save();
        res.json(savedChemical);
    } catch (error) {
        console.log(error);
        res.status(500).send("Error while saving the chemical resource.");
    }
});

// Editing a chemical resource by ID
router.put('/:id', async (req, res) => {
    try {
        const chemical = await ChemicalResource.findById(req.params.id);
        if (!chemical) return res.status(404).send('Chemical resource not found');

        chemical.chemicalName = req.body.chemicalName;
        chemical.quantity = req.body.quantity;
        chemical.hazardClassification = req.body.hazardClassification;
        chemical.expiryDate = req.body.expiryDate;
        chemical.purchaseDate = req.body.purchaseDate;
        chemical.purchaseCost = req.body.purchaseCost;
        chemical.storageCondition = req.body.storageCondition;

        const updatedChemical = await chemical.save();
        res.json(updatedChemical);
    } catch (error) {
        console.log(error);
        res.status(500).send('Error while updating the chemical resource.');
    }
});

// Deleting a chemical resource by ID
router.delete('/:id', async (req, res) => {
    try {
        const result = await ChemicalResource.deleteOne({ _id: req.params.id });
        if (result.deletedCount === 0) {
            return res.status(404).send('Chemical resource not found');
        }
        res.send("Deleted Successfully");
    } catch (error) {
        res.status(500).send('Error: ' + error);
    }
});

module.exports = router;
