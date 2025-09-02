import {Router} from "express";
import UserModel from "../Models/User.model.js";

let router = Router();


router.post("/register",async(req,res)=>{

    let user = await UserModel.create(req.body);
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

router.post("/login",async(req,res)=>{

    let {email,password} = req.body

    let user = await UserModel.findOne({email,password});

    if(!user){
        return res.json({
            status:"error",
            message:"User not found"
        });
    }

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
