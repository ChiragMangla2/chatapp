import { user } from "../modules/user.model.js"

export const getUsers = async (req,res) => {
    try {

        const users = await user.find({ _id: { $ne: req.body._id } }).select('-password -__v');

        if(users) {
            return res.status(200).json({message:"Users find successfully!", users,success:true})
        }
        return res.json({message:"Users not find!",success:false})
        
    } catch (error) {
        return res.status(500).json({message:"Something wrong!",success:false,error})
    }
}