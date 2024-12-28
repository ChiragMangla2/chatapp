import { user } from "../modules/user.model.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";

export const loginUser = async (req, res) => {
    try {

        const { username, password } = req.body;

        const data = await user.findOne({ username });
        if (!data) {
            return res.json({ message: "User not exist", success: false });
        }
        const passwordMatch = await bcrypt.compare(password, data.password);

        if (passwordMatch) {
            const token = generateToken(data._id);
            return res.status(200).json({ message: "Login successfully!", user:{_id:data._id,username:data.username,token},success: true })
        }

        return res.json({ message: "Invalid username or password!", success: false })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Something wrong", error });
    }
}
export const createUser = async (req, res) => {
    try {

        const { username, password } = req.body;

        const data = await user.findOne({ username });
        if (data) {
            return res.json({ message: "Username already exist", success: false });
        }

        const hashPassword = await bcrypt.hash(password, 4);

        const newUser = new user({ username, password: hashPassword });
        const result = await newUser.save();
        if (result) {
            return res.status(201).json({ message: "User created successfully!", success: true })
        }
        return res.status(400).json({ message: "User not created!", success: false })

    } catch (error) {
        console.log(error)
        return res.json({ message: "Something wrong", error });
    }
}