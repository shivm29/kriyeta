
import JWT from "jsonwebtoken"
import userModel from "../models/userModel.js";

export const followController = async (req, res) => {
    try {
        const { to_follow } = req.body
        // getting the token from headers to extract the user ID from it
        const token = req.headers.authorization;
        // decoding the token 
        const decoded = JWT.verify(token, process.env.JWT_SECRET)
        const user = decoded._id

        if (!to_follow) {
            return res.send({
                success: false,
                message: "whom to follow?"
            })
        }
        const alreadyFollowing = await userModel.findOne(
            {
                _id: user,
                following: { $in: [to_follow] },
            }
        )

        if (alreadyFollowing) {
            return res.status(201).send({
                success: true,
                message: "Already following"
            })
        }
        const add_following = await userModel.updateOne({ _id: user }, { $push: { following: to_follow } })
        const add_follower = await userModel.updateOne({ _id: to_follow }, { $push: { followers: user } })

        res.status(201).send({
            success: true,
            message: "User followed Successfully"
        })
    }
    catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in following"
        })
    }
}

export const getConnectionsNumber = async (req, res) => {
    try {
        // getting the token from headers to extract the user ID from it
        const token = req.headers.authorization;
        // decoding the token 
        const decoded = JWT.verify(token, process.env.JWT_SECRET)
        const user = decoded._id;

        const followers = await userModel.findById({ _id: user }, {
            followerCount: { $size: "$followers" }
        })

        const following = await userModel.findById({ _id: user }, {
            followingCount: { $size: "$following" }
        })

        const followerCount = followers.toJSON().followerCount
        const followingCount = following.toJSON().followingCount


        return res.status(200).send({
            success: true,
            followerCount,
            followingCount,
            message: "count fetched successfully"
        })

    }
    catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in getting count"
        })
    }

}

export const isconnectedController = async (req, res) => {
    try {
        const token = req.headers.authorization
        const decoded = JWT.verify(token, process.env.JWT_SECRET)
        const user = decoded._id

        const { user_name } = req.query

        console.log(user_name)

        const user_id = await userModel.findOne({ username: user_name })

        if (!user_id) {
            return res.status(400).send({
                success: false,
                message: "Unable to get user"
            })
        }

        const follows = await userModel.find({
            _id: user,
            following: { $in: user_id }
        })

        let result;
        if (follows) result = true;
        else result = false

        res.status(200).send({
            success: true,
            follows: result,
        })

    }
    catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in determining connection"
        })
    }

}
