import {Request,Response} from 'express';
import User from '../models/User.js';
import bcrypt from 'bcrypt';
import RegisterRequest from "../dtos/registerRequest";
import LoginRequest from "../dtos/loginRequest";
import jwt from "jsonwebtoken";

const JWT_SECRET = "super_secret_key";

export const register = async (  req: Request<{}, {}, RegisterRequest>, // {} = fără params, {} = fără response type, RegisterRequest = body
     res:Response) => {
    try {
        const { username, email,password } = req.body;
        const existingEmail =await User.findOne({where:{email}});
        if(existingEmail){
            return res.status(400).json({error:'Email already in use!'});
        }
        const existingUsername=await User.findOne({where:{username}});
        if(existingUsername){
            return res.status(400).json({error:'Username already in use!'});
        }
        const hashedPassword = await bcrypt.hash(password, 10); // 10 = salt rounds
        const user = await User.create({ username, email, password:hashedPassword ,role:"USER"});
        return res.status(201).json(user);
    } catch (err:any) {
        return res.status(500).json({ error: err.message });
    }
};

export const login=async(req: Request<{}, {}, LoginRequest>,res:Response)=>{
  try{
      const {email,password}=req.body;
      const user =await User.findOne<User>({where:{email}});
      if(!user){
          return res.status(400).json({error:'Bad credentials!'});
      }

      const isPasswordValid=await bcrypt.compare(password,user.password);
      if(!isPasswordValid){
          return res.status(400).json({error:'Bad credentials!'});
      }

      // generează token
      const token = jwt.sign(
          { role: user.getDataValue("role"), email: user.getDataValue("email") },
          JWT_SECRET,
          { expiresIn: "1h" }
      );

      return res.json({ token });
  } catch (err:any) {
      return res.status(500).json({ error: err.message });
  }
};