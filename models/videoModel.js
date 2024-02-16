import mongoose from "mongoose";

const videoSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
        },

        likes: {
            type: Number,
            default: 0
        },
        comments: {
            type: [mongoose.Schema.Types.ObjectId]
        },

        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        },
        link: {
            type: String,
            required: true
        }
    },
    { timestamps: true }
);

export default mongoose.model('videos', videoSchema)