const express = require("express");
const router = express.Router();
const Resource = require("../models/ResourceShedule");

// Getting All Resource data
router.get('/', async (req, res) => {
    try {
        const resources = await Resource.find();
        res.json(resources);
    } catch (error) {
        res.send('Error: ' + error);
    }
});

// Getting One Resource Data by ID
router.get('/:id', async (req, res) => {
    try {
        const resource = await Resource.findById(req.params.id);
        res.json(resource);
    } catch (error) {
        console.log("Error: " + error);
    }
});

// Posting Resource Data (Adding a new resource)
router.post('/', async (req, res) => {
    const resource = new Resource({
        name: req.body.name,
        type: req.body.type,
        frequency: req.body.frequency,
        lastMaintenanceDate: req.body.lastMaintenanceDate,
        nextMaintenanceDate: req.body.nextMaintenanceDate,
        note: req.body.note,
        purchaseCost: req.body.purchaseCost,
        depreciationCost: req.body.depreciationCost,
        annualMaintenanceCost: req.body.annualMaintenanceCost,
        operatingCost: req.body.operatingCost
    });

    try {
        const resource1 = await resource.save();
        res.json(resource1);
    } catch (error) {
        console.log(error);
        res.send("Error");
    }
});

// Editing/Updating Resource Data by ID
router.put('/:id', async (req, res) => {
    try {
        const resource = await Resource.findById(req.params.id);
        resource.name = req.body.name;
        resource.type = req.body.type;
        resource.frequency = req.body.frequency;
        resource.lastMaintenanceDate = req.body.lastMaintenanceDate;
        resource.nextMaintenanceDate = req.body.nextMaintenanceDate;
        resource.note = req.body.note;
        resource.purchaseCost = req.body.purchaseCost;
        resource.depreciationCost = req.body.depreciationCost;
        resource.annualMaintenanceCost = req.body.annualMaintenanceCost;
        resource.operatingCost = req.body.operatingCost;

        const resource1 = await resource.save();
        res.json(resource1);
    } catch (error) {
        console.log(error);
    }
});

// Deleting a Resource by ID
router.delete("/:id", async (req, res) => {
    try {
        const result = await Resource.deleteOne({
            _id: req.params.id
        });
        console.log(result);
        res.send("Deleted Successfully");
    } catch (error) {
        res.send(error);
    }
});

module.exports = router;
