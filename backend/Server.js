import express from "express"
import cors from "cors"
import "dotenv/config"
import mongoose from "mongoose"

import userRoutes from "./Routes/User.route.js"
import thoughtRoutes from "./Routes/Thought.route.js"

import connectDB from "./Config/Db.js"


const app = express()

app.use(cors())
app.use(express.json())

connectDB()

app.use("/api/users", userRoutes)
app.use("/api/thoughts", thoughtRoutes)



app.listen(process.env.PORT, () => {
    console.log("Server started on port " + process.env.PORT)
})

