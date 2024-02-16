import commentsModel from "../models/commentsModel.js"
import videoModel from "../models/videoModel.js"

export const uploadCommentController = async (req, res) => {
    try {
        const { comment, user_id, videoId } = req.body

        if (!comment) {
            return res.send("comment required")
        }
        if (!user_id) {
            return res.send("user_id required")
        }
        if (!videoId) {
            return res.send("videoId required")
        }

        const newComment = new commentsModel({
            comment, user_id, videoId
        })

        await newComment.save()

        // add the comment in the comment array of Video
        const putCommentInVideo = await videoModel.updateOne({ _id: videoId },
            {
                $push: { comments: newComment._id }
            })

        res.status(200).send({
            success: true,
            message: "comment uploaded",
        })
    }
    catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in Uploading Comment :("
        })
    }
}

export const replyCommentController = async (req, res) => {
    try {
        const { comment, videoId, user_id, parentComment } = req.body

        if (!comment) {
            return res.send("comment required")
        }
        if (!user_id) {
            return res.send("user_id required")
        }
        if (!videoId) {
            return res.send("videoId required")
        }
        if (!parentComment) {
            return res.send("parentComment required")
        }



        const reply = new commentsModel({
            comment, user_id, videoId, parentComment
        })

        await reply.save();

        const addReply = await commentsModel.findByIdAndUpdate({ _id: parentComment }, {
            $push: { replies: reply._id }
        })

        res.status(201).send({
            success: true,
            message: "Successfully replied"
        })

    }
    catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in Replying :("
        })
    }
}