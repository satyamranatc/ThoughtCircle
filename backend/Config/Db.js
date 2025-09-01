import mongoose from "mongoose"
import "dotenv/config"

export default function connectDB()
{

    mongoose.connect(process.env.MongoDB_URI).then(()=>{
        console.log("Connected to MongoDB...")
    }).catch((err)=>{
        console.log(err)
    })

}
