import {NextFunction,Response,Request} from "express";


export const getRole=(req:Request,res:Response,next:NextFunction)=>{
    return res.status(200).json({message:"Hey admin!"});
}