const express = require('express');
const router = express.Router();

const IssueTool = require('../models/Isuuedtool'); // Assuming your model is named Issueditem
const Tool = require('../models/tools');

// Route to issue tools
router.post('/tools/issue', async (req, res) => {
    try {
        const toolToIssue = req.body;
   // Check if toolToIssue is an array or can be iterated over
   if (!Array.isArray(toolToIssue)) {
    return res.status(400).json({
        success: false,
        error: "Invalid input format. Expected an array of tools to issue."
    });
}
        for (const tool of toolToIssue) {
            const { toolCode, qty, personName,project, issuedDate } = tool;
            

            // Find the tool by toolCode
            const existingTool = await Tool.findOne({ toolCode: toolCode });

            if (!existingTool) {
                return res.status(404).json({
                    success: false,
                    message: `Tool with toolCode ${toolCode} not found`
                });
            }

            // Check if there are enough tools available to issue
            if (existingTool.qty < qty) {
                return res.status(400).json({
                    success: false,
                    message: `Insufficient quantity of tool with toolCode ${toolCode} available`
                });
            }

            // Update item quantity (decrement by qty)
            existingTool.qty -= qty;
            await existingTool.save();

            // Store issued tool in the database
            const issuedTool = new IssueTool({
                toolId: existingTool._id,
                toolCode: toolCode,
                qty: qty,
                project:project,
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

        console.log('Received request for toolCode:', toolCode);

        const tool = await Tool.findOne({ toolCode: toolCode }).exec();

        if (!tool) {
            console.log('Tool not found for toolCode:', toolCode);
            return res.status(404).json({
                success: false,
                message: 'Item not found'
            });
        }

        console.log('Found tool:', tool);

        return res.status(200).json({
            success: true,
            tool: tool
        });
    } catch (err) {
        console.error('Error:', err);

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



// Route to return a tool
router.post('/tools/return/:id', async (req, res) => {
    try {
        const toolId = req.params.id;
        
        console.log('Tool ID:', toolId); // Add this line for debugging

        // Find the issued tool by its ID
        const issuedTool = await IssueTool.findById(toolId);

        console.log('Issued Tool:', issuedTool);

        if (!issuedTool) {
            return res.status(404).json({
                success: false,
                message: 'Issued tool not found'
            });
        }

        // Update the quantity in the Tool collection
        const tool = await Tool.findOne({ toolCode: issuedTool.toolCode });
        if (tool) {
            const returnedQty = issuedTool.qty; // Adjust the quantity to return
            tool.qty += returnedQty; // Add the quantity back to the tool
            await tool.save();
        }

        // Remove the issued tool from the IssuedTool collection
        await IssueTool.findByIdAndRemove(toolId);

        return res.status(200).json({
            success: true,
            message: 'Tool returned successfully'
        });
    } catch (err) {
        console.error('Error returning tool:', err);
        return res.status(500).json({
            success: false,
            error: err.message
        });
    }
});



module.exports = router;



 