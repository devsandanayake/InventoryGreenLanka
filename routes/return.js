const express = require('express');
const router = express.Router();

const Return = require("../models/return");
const Issue = require("../models/Issueditem");

router.post('/return/save', async (req, res) => {
    const today = new Date();

    try {
        const issuedDetails = await Issue.findOne({
            itemCode: req.body.issuedDetails.itemCode,
            qty: req.body.issuedDetails.qty,
            projectName: req.body.issuedDetails.projectName,
            issuedDate: req.body.issuedDetails.issuedDate
        }).exec();

        if (!issuedDetails) {
            return res.status(404).json({
                error: "Issued item details not found"
            });
        }

        const returnItem = new Return({
            issuedDetails: issuedDetails,
            returnDate: today,
            returnItem: req.body.returnItem,
            returnQty: req.body.returnQty,
            returnReason: req.body.returnReason,
            returnStatus: req.body.returnStatus,
            returnApprovedBy: req.body.returnApprovedBy
        });

        const savedReturn = await returnItem.save();

        // Update the status of the issued item to "Returned"
        const updatedIssuedItem = await Issue.findByIdAndUpdate(
            issuedDetails.id,
            { $set: { status: 'Returned' } },
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
            message: 'Return saved and item status updated'
        });
        
    } catch (err) {
        return res.status(400).json({
            error: err.message
        });
    }
});


router.get('/return/show', async (req, res) => {
    try {
        const returnItems = await Return.find().populate('issuedDetails').exec();

        if (!returnItems) {
            return res.status(404).json({
                success: false,
                message: 'Return items not found'
            });
        }

        return res.status(200).json({
            success: true,
            returnItems: returnItems
        });
    } catch (err) {
        return res.status(400).json({
            error: err.message
        });
    }
});


module.exports = router;
