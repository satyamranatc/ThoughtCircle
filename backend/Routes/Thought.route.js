import {Router} from "express";
import ThoughtModel from "../Models/Thought.model.js";


let router = Router();


router.post("/create",async(req,res)=>{
    let thought = await ThoughtModel.create(req.body);
    res.json({
        status:"success",
        data:thought
    });
});

router.get("/list",async(req,res)=>{
    let thoughts = await ThoughtModel.find().populate("thoughtAuthor");
    res.json({
        status:"success",
        data:thoughts
    });
});


router.get("/listByAuthor/:authorId",async(req,res)=>{
    let thoughts = await ThoughtModel.find({thoughtAuthor:req.params.authorId});
    res.json({
        status:"success",
        data:thoughts.map(thought=>{
            return {
                "_id":thought._id,
                "thoughtTitle":thought.thoughtTitle,
                "thoughtText":thought.thoughtText,
            }
        })
    });
})


export default router;