import { msgModel } from "../modules/msg.model.js";

// save msg in db
export const saveMsg = async ({ msg, senderId, receiverId }) => {
    try {

        const newMsg = new msgModel({ msg, senderId, receiverId });
        const result = await newMsg.save();

    } catch (error) {
        console.log("Something wrong",error)
    }
}

// get all msg between sender and receiver
export const getMsg = async (req,res) => {
    try {

        const queryParams = req.query;

        const data = await msgModel.find({
            $or:[
                { senderId:queryParams.senderId,receiverId:req.body._id },
                { senderId:req.body._id,receiverId:queryParams.senderId }
            ]
        });

        if(data) {
            return res.status(200).json({message:"Msg find successfully!", data,success:true})
        }
        return res.json({message:"No Messages!",success:false})
        
    } catch (error) {
        return res.status(500).json({message:"Something wrong!",success:false,error})
    }
}