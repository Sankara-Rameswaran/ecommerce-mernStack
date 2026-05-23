import jwt from 'jsonwebtoken'

const authMiddleware = async (req,res,next) =>{
    try{
        const headers = req.headers.authorization;
        if(!headers){
            throw new Error("No token exists")
        }
        const token = headers.split(" ")[1];

        const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY);
        if(!decoded){
            throw new Error("Invalid token")
        }
        req.user = decoded;
        next();
    }catch(err)
    {
        res.status(401).json({
            success:false,
            message:err.message
        })
    }
}   

export default authMiddleware;