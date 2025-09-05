import {Router} from "express";
import UserModel from "../Models/User.model.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

let router = Router();


router.post("/register",async(req,res)=>{

    let {fullName,avatar,email,password} = req.body
    let user = await UserModel.create({fullName,avatar,email,password : bcrypt.hashSync(password,10)});
    res.json({
        status:"success",
        token:jwt.sign({_id:user._id},process.env.JWT_SECRET),
        data:{
            "_id":user._id,
            "fullName":user.fullName,
            "email":user.email,
            "avatar":user.avatar
        }
    });
})

router.post("/login",async(req,res)=>{

    let {email,password} = req.body

    let user = await UserModel.findOne({email});

    
    if(!user){
        return res.json({
            status:"error",
            message:"User not found"
        });
    }

    if(bcrypt.compareSync(password,user.password)){
        return res.json({
        status:"success",
        token:jwt.sign({_id:user._id},process.env.JWT_SECRET),
        data:{
            "_id":user._id,
            "fullName":user.fullName,
            "email":user.email,
            "avatar":user.avatar
        }
    });
    }

     return res.json({
            status:"error",
            message:"Invalid Password"
        });
})

router.get("/all",async(req,res)=>{

    let users = await UserModel.find();
    res.json({
        status:"success",
        data:users.map((user)=>{
            return {
                "_id":user._id,
                "fullName":user.fullName,
                "email":user.email,
                "avatar":user.avatar
            }
        })
    });
})

router.get("/:id",async(req,res)=>{

    let user = await UserModel.findById(req.params.id);
    res.json({
        status:"success",
        data:{
            "_id":user._id,
            "fullName":user.fullName,
            "email":user.email,
            "avatar":user.avatar
        }
    });
})

export default router;
