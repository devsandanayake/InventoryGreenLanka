const express = require('express');
const router = express.Router();

const IssueTool = require('../models/Isuuedtool'); // Assuming your model is named Issueditem
const Tool = require('../models/tools');

router.post('/tools/issue', async (req, res) => {
    try {
        const toolToIssue = req.body;

        for (const tool of toolToIssue) {
            const { toolCode, qty, personName ,issuedDate} = tool;

            // Your logic to issue items for a single project goes here
            // Update item quantities and store issued items in the database

            // Example logic to update item quantity
            const updatedItem = await Tool.findOneAndUpdate(
                { toolCode: toolCode },
                { $inc: { qty: -qty } },
                { new: true }
            );

            // Example logic to store issued item in the database
            const issuedTool = new IssueTool({
                toolCode: toolCode,
                qty: qty,
                personName: personName,
                issuedDate: issuedDate
            });
            await issuedTool.save();
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


router.get('/tools/:toolCode', async (req, res) => {
    try {
        const toolCode = req.params.toolCode;
        const tool = await Tool.findOne({ toolCode: toolCode }).exec();
        
        if (!tool) {
            return res.status(404).json({
                success: false,
                message: 'Item not found'
            });
        }
        
        return res.status(200).json({
            success: true,
            tools: tool
        });
    } catch (err) {
        return res.status(400).json({
            error: err.message
        });
    }
});

router.get('/issue/tool', async (req, res) => {
    try {
        const tools = await IssueTool.find({}).exec();
        
        return res.status(200).json({
            success: true,
            tools: tools
        });
    } catch (err) {
        return res.status(400).json({
            error: err.message
        });
    }
});


module.exports = router;