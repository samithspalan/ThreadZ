import dotenv from 'dotenv';
dotenv.config();
import aj from '../lib/arcjet.js';
import { isSpoofedBot } from "@arcjet/inspect";

export const arcjetprotection=async(req,res,next)=>{
    try{
        const access=await aj.protect(req);
        if(access.isDenied){
            if (access.reason.isRateLimit()){
            return res.status(429).json({message:"Rate limit exceeded, please try again later"});
        }else if (access.reason.isBot){
            return res.status(403).json({message:"Bot access denied by Arcjet"});
        }else{
            return res.status(403).json({message:"Access denied by Arcjet"});
        }
            
    }
    //check for spoofed bot
    if(access.results.some(isSpoofedBot)){
        return res.status(403).json({message:"Spoofed bot detected, access denied"});
    }
  next();
}
    catch{
        return res.status(403).json({message:"Access denied by Arcjet"});
        next();
    }
};