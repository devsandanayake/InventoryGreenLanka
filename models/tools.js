const mongoose = require('mongoose');

const toolSchema = new mongoose.Schema({
    toolCode: {
        type: String,
        required: true,
    },
    toolName: {
        type: String,
        required: true,
    },
    qty: {
        type: Number,
        required: true,
        validate: {
            validator: Number.isInteger, // Ensures the value is an integer
            message: '{VALUE} is not an integer value for qty'
        },
        min: -2147483648, // Minimum 32-bit integer value
        max: 2147483647   // Maximum 32-bit integer value
    }
});

module.exports = mongoose.model('tool', toolSchema);
