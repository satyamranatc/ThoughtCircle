import jwt from "jsonwebtoken";
import "dotenv/config"
export default function authMiddleWare(req,res,next)
{

    let token = req.headers.authorization;
    if(token)
    {
        token = token.split(" ")[1];
        jwt.verify(token,process.env.JWT_SECRET,(err,decoded)=>{
            if(err)
            {
                res.json({
                    status:"error",
                    message:"Invalid Token"
                })
            }
            else
            {
                // req.user = decoded;
                next();
            }
        })
    }
    else
    {
        res.json({
            status:"error",
            message:"token not found"
        })
    }

}