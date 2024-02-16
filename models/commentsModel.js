import mongoose from "mongoose";

const commentsSchema = new mongoose.Schema(
    {
        comment: {
            type: String,
            required: true,
        },
        videoId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        },
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        },
        replies: {
            type: [mongoose.Schema.Types.ObjectId]
        },
        likes: {
            type: Number,
            default: 0
        },
        parentComment: {
            type: mongoose.Schema.Types.ObjectId,
            default: null
        },
    },
    { timestamps: true }
);

export default mongoose.model('comments', commentsSchema)