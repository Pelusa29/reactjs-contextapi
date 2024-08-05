import mongoose from "mongoose"

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 30,
        trim: true
    },
    description: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 300,
        trim: true
    },
    image: {
        url: String,
        public_id: String
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

export default mongoose.model("Post", PostSchema)