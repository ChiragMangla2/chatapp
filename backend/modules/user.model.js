import mongoose from 'mongoose';

var userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
});

//Export the model
export const user = mongoose.model('User', userSchema);