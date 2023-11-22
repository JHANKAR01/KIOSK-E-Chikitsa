const mongoose =require('mongoose');
const Schema=mongoose.Schema;

const LoginSchema = new Schema({
    number:{
        type:Number,
        unique:true,
        required:true,
    },
    Name : String,
     
    // age:Number,
    // description : String
})
module.exports = mongoose.model('Data',LoginSchema);