const express = require('express');
const router = express.Router();

const Tool = require('../models/tools'); // Make sure your model name matches

router.post('/tools/save', async (req, res) => {
    try {
        const newTool = new Tool({
            toolCode: req.body.toolCode,
            toolName: req.body.toolName,
            qty: req.body.qty
        });

        // Save the tool using async/await
        const savedTool = await newTool.save();

        return res.status(200).json({
            success: true,
            message: "Tool saved successfully"
        });
    } catch (err) {
        return res.status(400).json({
            error: err.message
        });
    }
});

router.get('/tools', async (req, res) => {
    try {
        const tools = await Tool.find().exec();
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

router.delete('/tools/delete/:id', async (req, res) => {
    try {
        const deletedTool = await Tool.findByIdAndRemove(req.params.id).exec();
        return res.status(200).json({
            success: true,
            deletedTool
        });
    } catch (err) {
        return res.status(400).json({
            error: err.message
        });
    }
});

router.put('/tools/update/:id', async (req, res) => {
    try {
        const updatedTool = await Tool.findByIdAndUpdate(
            req.params.id,
            {
                $set: {
                    toolCode: req.body.toolCode,
                    toolName: req.body.toolName,
                    qty: req.body.qty
                }
            },
            { new: true }
        );
        return res.status(200).json({
            success: true,
            updatedTool: updatedTool
        });
    } catch (err) {
        return res.status(400).json({
            error: err.message
        });
    }
});

router.get('/tools/:id', async (req, res) => {
    try {
        const tool = await Tool.findById(req.params.id).exec();
        return res.status(200).json({
            success: true,
            tool: tool
        });
    } catch (err) {
        return res.status(400).json({
            error: err.message
        });
    }
});




module.exports = router;
