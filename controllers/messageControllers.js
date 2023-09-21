const MessageSchema = require('../models/messageModel')

exports.sendMessage = async (req, res) => {
    const userId = req.userId

    const to = req.body.to
    const from = req.body.from
    const messageText = req.body.message

    if(userId !== from){
        //User is trying to send a message for someone else
        return res.status(403).json({ success: false, msg: "Permission denied" })
    }

    //No need to control whether user exists or not. Because we are getting userId from jwt token too.
    //If user not exists, then, the checkLogin middleware will handle that situation

    const message = new MessageSchema({
        to: to,
        from: from,
        message: messageText
    })

    try {
        const result = await message.save()

        if(Object.keys(result).length === 0){
            console.log("Failed to save message")
            return res.status(500).json({ success: false, msg: "Please try again later"})
        }

        return res.json({ success: true })
    }

    catch (err) {
        console.log(err)
        return res.status(500).json({success: false, msg: "Please try again later"})
    }
}

exports.getMessages = async (req, res) => {
    const userId = req.userId
    let messages

    try {
        messages = await MessageSchema.find({from: userId}).sort('createdAt')
    }

    catch (err){
        console.log(err)
        return res.status(500).json({ success: false, msg: "Please try again later" })
    }

    console.log(messages)

    return res.json({ success: true, data: messages})
}