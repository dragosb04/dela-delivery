import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = "super_secret_key";


interface AuthRequest extends Request{
    user?:any  // ? inseamna ca acest camp e optional sau poate fi undefined
}

export const authenticateJWT=(req:AuthRequest,res:Response,next:NextFunction)=> {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1]; //"Bearer token"

    if (!token)
        return res.status(401).json({error: "No token provided!"}); //401 Unauthorized

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(403).json({error:"Invalid token!"}); //403 Forbidden
    }

}

export const authorizeRoles=(...roles:string[])=>{
    // ... inseamnă că funcția poate primi orice număr de argumente separate, și TypeScript le va transforma automat într-un array.
    return (req:AuthRequest,res:Response,next:NextFunction)=>{
        if(!req.user || !roles.includes(req.user.role))
            return res.status(403).json({error:"Forbidden"});
        next();
    }
}