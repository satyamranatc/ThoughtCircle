import mongoose from "mongoose";

let userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        default:"https://www.shutterstock.com/image-vector/writer-work-vector-illustration-600w-252156175.jpg"
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    
});

export default mongoose.model("UserModel", userSchema);