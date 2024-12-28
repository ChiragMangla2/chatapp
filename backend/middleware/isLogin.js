import jwt from 'jsonwebtoken';

export const isLogin = async (req,res,next) => {
    const token = req.headers.authorization.split(' ')[1];
    try {
        const decoded = await jwt.verify(token, 'JWTSECREAT');
        if(decoded) {
            req.body._id = decoded.id;
            next();
        }
        
    } catch (error) {
        return res.json({message:"Login failed", success:false});
    }
}