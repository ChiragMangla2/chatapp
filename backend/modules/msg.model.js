import mongoose from "mongoose";

var msgSchema = new mongoose.Schema({
    msg:{
        type:String,
        required:true,
    },
    senderId:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
    },
    receiverId:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
    },
});

//Export the model
export const msgModel = mongoose.model('messages', msgSchema);