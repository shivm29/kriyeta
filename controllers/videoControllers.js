import videoModel from "../models/videoModel.js"

export const uploadVideoController = async (req, res) => {
    try {
        const { link, title, description, user_id } = req.body
        if (!link) {
            return res.send("link required")
        }
        if (!title) {
            return res.send("title required")
        }

        const existingLink = await videoModel.findOne({ link })

        if (existingLink) return res.status(408).send({
            success: false,
            message: "Video Already Exists"
        })

        const video = new videoModel({
            title, link, description, user_id
        }).save()


        res.status(201).send({
            success: true,
            message: "Video Successfully Uploaded",
            video
        })

    }
    catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in Uploading Video :("
        })
    }
}