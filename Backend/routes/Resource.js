const express = require("express"); 
const router = express.Router(); 
const Resource = require("../models/Resource")

//Getting All Resource data
router.get('/',async(req,res)=>{
    try {
        const resources = await Resource.find()
        res.json(resources);
    } catch (error) {
        res.send('Error'+error)
        
    }
})

//Getting One Rresource Data
router.get('/:id',async(req,res)=>{
    try {
        const resource = await Resource.findById(req.params.id)
        res.json(resource)

    } catch (error) {
        console.log("Error"+error)
        
    }
})

//Posting Resource Data
router.post('/',async(req,res)=>{
    const resource = new Resource({
        name:req.body.name,
        type:req.body.type, 
        model:req.body.model,
        manufacturer:req.body.manufacturer,
        setno:req.body.setno,
        purchasedate:req.body.purchasedate,
        warrantyexpire:req.body.warrantyexpire,
        maintainenceschedule:req.body.maintainenceschedule,
        purchasecost:req.body.purchasecost,
        note:req.body.note
    })
    try {
        const resource1 = await resource.save()
        res.json(resource1)
    } catch (error) {
        console.log(error);
        res.send("Error")
        
    }
})

//Editting the Resource Data
router.put('/:id',async(req,res)=>{
   try {
    const resource = await Resource.findById(req.params.id)
    resource.name = req.body.name
    resource.type = req.body.type 
    resource.model = req.body.model
    resource.manufacturer = req.body.manufacturer
    resource.setno = req.body.setno
    resource.purchasedate = req.body.purchasedate
    resource.warrantyexpire = req.body.warrantyexpire
    resource.maintainenceschedule = req.body.maintainenceschedule
    resource.purchasecost = req.body.purchasecost
    note:req.body.note

    const resource1 = await resource.save()
    res.json(resource1)

   } catch (error) {
    console.log(error)
    
   }
})

router.delete("/:id",async(req,res)=>{
    try {
        const result = await Resource.deleteOne({
            _id:req.params.id
        })
        console.log(result)
        res.send("Deleted Successfully")
    } catch (error) {
        res.send(error)
        
    }
})

module.exports = router;