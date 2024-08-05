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
    }
})

export default mongoose.model("Post", PostSchema)