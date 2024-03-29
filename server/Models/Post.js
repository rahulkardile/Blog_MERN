import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    summary: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
    },
    cover: {
        type: String,
        default: true,
    }
}, {
    timestamps: true
}
)
const Post = mongoose.model("Post", postSchema);

export default Post