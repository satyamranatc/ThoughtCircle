import {Router} from "express";
import ThoughtModel from "../Models/Thought.model.js";
import authMiddleWare from "../Middlewares/auth.middleware.js";


let router = Router();


router.post("/create",authMiddleWare,async(req,res)=>{
    let thought = await ThoughtModel.create(req.body);
    res.json({
        status:"success",
        data:thought
    });
});

router.get("/list/:id",authMiddleWare,async(req,res)=>{
    let thoughts = await ThoughtModel.find().populate("thoughtAuthor");
    // exclude thoughtAuthor
    thoughts = thoughts.filter(thought=>thought.thoughtAuthor._id.toString() != req.params.id);
    res.json({
        status:"success",
        data:thoughts
    });
});


router.get("/listByAuthor/:authorId",authMiddleWare,async(req,res)=>{
    let thoughts = await ThoughtModel.find({thoughtAuthor:req.params.authorId});
    console.log(thoughts);
    
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