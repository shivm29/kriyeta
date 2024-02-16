import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        mobile: {
            type: String,
            required: true,
        },
        links: {
            type: [String],
        },
        
        password: {
            type: String,
            required: true
        },
        bio: {
            type: String,
        },
        followers: {
            type: [mongoose.Schema.Types.ObjectId]
        },
        following: {
            type: [mongoose.Schema.Types.ObjectId]
        },
        creds: {
            type: Number,
            default: 0
        },
        videos: {
            type: [mongoose.Schema.Types.ObjectId]
        }
    },
    { timestamps: true }
);

export default mongoose.model('users', userSchema)
