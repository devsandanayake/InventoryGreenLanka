const mongoose = require('mongoose');

const toolSchema = new mongoose.Schema({
    toolCode:{
        type:String,
        required:true,
        unique:true
        
    },
    toolName:{
        type:String,
        required:true,
        unique:true
      
    },
    qty:{
        type:String,
        required:true
    
    }
});

module.exports = mongoose.model('tool',toolSchema);