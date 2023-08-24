const express = require('express');
const router = express.Router();

const Item = require('../models/Items'); // Import the Item model
 
router.post('/items/save', async (req, res) => { // Change route to /items
    try {
        const newItem = new Item({
            itemCode: req.body.itemCode,
            itemName: req.body.itemName,
            qty: req.body.qty
        });

        // Save the item using async/await
        const savedItem = await newItem.save();

        return res.status(200).json({
            success: true,
            message: "Item saved successfully"
        });
    } catch (err) {
        return res.status(400).json({
            error: err.message
        });
    }
});

router.get('/items', async (req, res) => { // Change route to /items
    try {
        const items = await Item.find().exec();
        return res.status(200).json({
            success: true,
            items: items
        });
    } catch (err) {
        return res.status(400).json({
            error: err.message
        });
    }
});

router.put('/items/:id', async (req, res) => { // Change route to /items/:id
    try {
        const updatedItem = await Item.findByIdAndUpdate(
            req.params.id,
            {
                $set: {
                    itemCode: req.body.itemCode,
                    itemName: req.body.itemName,
                    qty: req.body.qty
                }
            },
            { new: true }
        );

        if (!updatedItem) {
            return res.status(404).json({
                success: false,
                message: "Item not found"
            });
        }

        return res.status(200).json({
            success: true,
            updatedItem: updatedItem
        });
    } catch (err) {
        return res.status(400).json({
            error: err.message
        });
    }
});

router.delete('/items/:id', async (req, res) => { // Change route to /items/:id
    try {
        const deletedItem = await Item.findByIdAndRemove(req.params.id).exec();
        
        if (!deletedItem) {
            return res.status(404).json({
                success: false,
                message: "Item not found"
            });
        }

        return res.status(200).json({
            success: true,
            deletedItem: deletedItem
        });
    } catch (err) {
        return res.status(400).json({
            error: err.message
        });
    }
});

 

module.exports = router;
