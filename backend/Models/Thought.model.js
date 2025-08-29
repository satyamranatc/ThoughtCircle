import mongoose from "mongoose";

let ThoughtSchema = new mongoose.Schema({
    thoughtTitle: {
        type: String,
        required: true,
        default: "Untitled"
    },
    thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 480
    },
    thoughtAuthor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserModel",
        required: true
    }
}, {timestamps: true});

export default mongoose.model("ThoughtModel", ThoughtSchema);