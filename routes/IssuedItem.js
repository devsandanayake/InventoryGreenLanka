const express = require('express');
const router = express.Router();

const Issue = require('../models/Issueditem'); // Assuming your model is named Issueditem
const Item = require('../models/Items'); // Assuming your model is named Item

router.post('/items/issue', async (req, res) => {
    try {
        const itemsToIssue = req.body;

        for (const item of itemsToIssue) {
            const { itemCode, qty, projectName ,issuedDate} = item;

            // Your logic to issue items for a single project goes here
            // Update item quantities and store issued items in the database

            // Example logic to update item quantity
            const updatedItem = await Item.findOneAndUpdate(
                { itemCode: itemCode },
                { $inc: { qty: -qty } },
                { new: true }
            );

            // Example logic to store issued item in the database
            const issuedItem = new Issue({
                itemCode: itemCode,
                qty: qty,
                projectName: projectName,
                issuedDate: issuedDate
            });
            await issuedItem.save();
        }

        return res.status(200).json({
            success: true,
            message: 'Items issued successfully'
        });
    } catch (err) {
        return res.status(400).json({
            error: err.message
        });
    }
});

router.get('/issue/show', async (req, res) => {
    try {
        const issuedItems = await Issue.find().exec();
        return res.status(200).json({
            success: true,
            issuedItems: issuedItems
        });
    } catch (err) {
        return res.status(400).json({
            error: err.message
        });
    }
});


router.delete('/items/issue/:id', async (req, res) => {
    try {
        const deletedIssuedItem = await Issue.findByIdAndRemove(req.params.id).exec();
        return res.status(200).json({
            success: true,
            deletedIssuedItem: deletedIssuedItem
        });
    } catch (err) {
        return res.status(400).json({
            error: err.message
        });
    }
});

router.put('/updateitems/issue/:id', async (req, res) => {
    try {
        const updatedIssuedItem = await Issue.findByIdAndUpdate(
            req.params.id,
            {
                $set: {
                    itemCode: req.body.itemCode,
                    qty: req.body.qty,
                    projectName: req.body.projectName,
                    issuedDate: req.body.issuedDate,
                    status: req.body.status
                }
            },
            { new: true }
        );

        if (!updatedIssuedItem) {
            return res.status(404).json({
                success: false,
                message: 'Issued item not found'
            });
        }

        return res.status(200).json({
            success: true,
            updatedIssuedItem: updatedIssuedItem
        });
    } catch (err) {
        return res.status(400).json({
            error: err.message
        });
    }
});


router.get('/items/:itemCode', async (req, res) => {
    try {
        const itemCode = req.params.itemCode;
        const item = await Item.findOne({ itemCode: itemCode }).exec();
        
        if (!item) {
            return res.status(404).json({
                success: false,
                message: 'Item not found'
            });
        }
        
        return res.status(200).json({
            success: true,
            item: item
        });
    } catch (err) {
        return res.status(400).json({
            error: err.message
        });
    }
});


module.exports = router;
