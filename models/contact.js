const mongoose = require('mongoose');


//define the schema
//here you can put validations here
const contactSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    }
});

//name your collection
const Contact =  mongoose.model('Contact',contactSchema);

module.exports = Contact;